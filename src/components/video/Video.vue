<template>
    <div ref="zekVideo" :class="`zek-video video-container ${customClass}`" @click="$emit('onClick', $event)" v-on="customEvents">
        <component :class="`video-overlay ${overlay.class}`" :style="overlay.style" v-if="overlay && showOverlay" :is="overlay.component"/>
        <video
            v-if="source == 'local'"
            :style="styleObj"
            :id="playerId"
            :src="videoUrl"
            :width="width"
            :height="height"
            :muted="isMuted"
            :loop="loop"
            :controls="showControls"
            :autoplay="autoplay"
        ></video>
        <div v-else-if="source == 'youtube'" ref="ytplayer" :id="playerId" :style="styleObj"></div>
        <iframe
            v-else
            ref="zekPlayer"
            :id="playerId"
            :src="videoUrl"
            :style="styleObj"
            :width="width"
            :height="height"
            allow="autoplay;"
            frameborder="0"
        ></iframe>
    </div>
</template>

<script>
import Player from "@vimeo/player";

export default {
    name: "ZekVideo",
    props: {
        height: {
            type: [String, Number],
            default: ""
        },
        width: {
            type: [String, Number],
            default: ""
        },
        source: {  //local, youtube, dailymotion, vimeo
            type: String,
            default: ""
        },
        url: {
            type: String,
            required: true
        },
        playerId: {
            type: String,
            default: "zek-player"
        },
        isMuted: {
            type: Boolean,
            default: false
        },
        loop: {
            type: Boolean,
            default: false
        },
        showControls: {
            type: Boolean,
            default: false
        },
        autoplay: {
            type: Boolean,
            default: false
        },
        styleObj:{
            type: Object,
            default: () => ({})
        },
        play: {
            type: Boolean,
            default: false
        },
        customClass: {
            type: String,
            default: ""
        },
        showOverlay: {
            type: Boolean,
            default: true
        },
        overlay: {
            type: Object,
            default: () => ({})
        },
        customEvents: {
            type: Object,
            default: () => ({})
        },
    },
    data() {
        return {
            player: null,
            isYTScriptLoaded: false
        };
    },
    computed: {
        // ? Handle non-embeded urls
        embeddedUrl() {
            if (this.source == "youtube") {
                let videoId = this.url.includes("embed") ? this.url.split("/").at(-1) : this.url.split("=").at(-1);
                return `https://www.youtube.com/embed/${videoId}`;
            } else if (this.source == "vimeo") {
                let videoId = this.url.split("/").at(-1);
                return `https://player.vimeo.com/video/${videoId}`;
            } else {
                return this.url;
            }
        },
        videoUrl() {
            let url = this.embeddedUrl + "?";
            if (this.isMuted) {
                url += this.source == "vimeo" ? "muted=1&" : "mute=1&";
            }
            if (this.loop) {
                let id = this.url.split("/").at(-1);
                url += this.source == "youtube" ? "playlist=" + id + "&loop=1&" : "loop=1&";
            }
            if (!this.showControls) {
                url += "controls=0&";
            }
            if (this.autoplay) {
                url += "autoplay=1&";
            }
            return url;
        }
    },
    mounted() {
        if (this.source == "vimeo" && this.url) {
            let iframe = this.$refs.zekPlayer;
            this.player = new Player(iframe);
            this.player.on("playing", () => this.videoStarted());
            this.player.on("pause", () => this.videoStopped());
            this.player.on("ended", () => this.videoStopped());
        } else if (this.source == "youtube" && this.url) {
            this.loadYTScript();
        }
    },
    beforeUnmount() {
        if (this.player) {
            this.player.destroy();
        }
    },
    methods: {
        playVideo() {
            if (this.player) {
                if (this.source == "youtube" && typeof this.player.playVideo === "function") {
                    this.player.playVideo();
                } else if (this.source == "vimeo" && typeof this.player.play === "function") {
                    this.player.play();
                } else if (this.source == "local" && typeof this.player.play === "function") {
                    this.player.play();
                }
            }
        },
        pauseVideo() {
            if (this.player) {
                if (this.source == "youtube" && typeof this.player.pauseVideo === "function") {
                    this.player.pauseVideo();
                } else if (this.source == "vimeo" && typeof this.player.pause === "function") {
                    this.player.pause();
                } else if (this.source == "local" && typeof this.player.pause === "function") {
                    this.player.pause();
                }
            }
        },
        videoStarted() {
            this.$emit("videoStart");
        },
        videoStopped() {
            this.$emit("videoStop");
        },
        loadYTScript() {
            let ytScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
            if (ytScript) {
                this.isYTScriptLoaded = true;
                this.createPlayer();
            } else {
                var tag = document.createElement("script");
                tag.src = "https://www.youtube.com/iframe_api";
                var firstScriptTag = document.getElementsByTagName("script")[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                window.onYouTubeIframeAPIReady = () => {
                    this.isYTScriptLoaded = true;
                    this.createPlayer();
                };
            }
        },
        createPlayer() {
            if (this.player) {
                this.player.destroy();
            }
            let videoId = this.embeddedUrl.split("/").at(-1);
            this.player = new YT.Player(this.$refs.ytplayer, {
                height: this.height,
                width: this.width,
                videoId,
                playerVars: {
                    playsinline: 1,
                    mute: this.isMuted,
                    loop: this.loop,
                    controls: this.showControls ? 1 : 0,
                    autoplay: this.autoplay
                },
                events: {
                    onStateChange: event => {
                        if (event.data == window.YT.PlayerState.PLAYING) {
                            this.videoStarted();
                        } else if (
                            event.data == window.YT.PlayerState.PAUSED ||
                            event.data == window.YT.PlayerState.ENDED
                        ) {
                            this.videoStopped();
                        }
                    },
                    onReady: () => {
                        if (this.play) {
                            this.player.playVideo();
                        } else {
                            this.player.pauseVideo();
                        }
                    }
                }
            });
        }
    },
    watch: {
        isYTScriptLoaded(newVal) {
            if (newVal) {
                this.createPlayer();
            }
        },
        play(newVal) {
            if (this.player) {
                if (newVal) {
                    this.playVideo();
                } else {
                    this.pauseVideo();
                }
            }
        }
    }
};
</script>
<style scoped>
.video-container{
    position: relative;
    overflow: hidden;
}
.video-overlay{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
