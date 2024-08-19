import ZekRichTextEditor from "../components/rich-text-editor/RichTextEditor.vue";
import { action } from "@storybook/addon-actions";

export default {
  title: "Zekoder/Rich Text Editor",
  component: ZekRichTextEditor
};

const Template = (args, { argTypes }) => ({
  components: { ZekRichTextEditor },
  props: Object.keys(argTypes),
  methods: { action },
  template: '<ZekRichTextEditor v-bind="$props" @onChange="action(`onChange`)($event)"/>'
});

export const Primary = Template.bind({});
Primary.args = {
//   toolbar: "",
  initialValue: `
    <!DOCTYPE html>
<html lang="" xml:lang="" xmlns="http://www.w3.org/1999/xhtml">
 <head>
  <title>
   AKDAS-html.html
  </title>
  <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
  <style type="text/css">
   <!--
    p {margin: 0; padding: 0;} .ft30{font-size:18px;font-family:QMJCQX+UniversCondensed;color:#000000;}
    .ft31{font-size:18px;font-family:DQBGRC+Humanist521BT-Roman;color:#000000;}
    .ft32{font-size:15px;font-family:EUFIEV+Humanist777BT-BlackB;color:#ffffff;}
    .ft33{font-size:30px;font-family:LHWYYH+Humanist777BT-BlackB;color:#e62d2b;}
    .ft34{font-size:18px;font-family:SCGOST+FuturaBT-Light;color:#000000;}
    .ft35{font-size:18px;line-height:21px;font-family:SCGOST+FuturaBT-Light;color:#000000;}
-->
  </style>
 </head>
 <body bgcolor="#A0A0A0" link="blue" style="margin: 0; padding:0 ;background-color: white" vlink="blue">
  <div id="page3-div" style="position:relative;width:892px;height:1262px;">
   <img alt="background image" height="1262" src="AKDAS003.png" width="892"/>
   <p class="ft30" style="position:absolute;top:1203px;left:43px;white-space:nowrap">
    -3-
   </p>
   <p class="ft31" style="position:absolute;top:1203px;left:378px;white-space:nowrap">
    www.akdasco.com www.akdasco.com
   </p>
   <p class="ft32" style="position:absolute;top:48px;left:43px;white-space:nowrap">
    نصف آلي مسدس
   </p>
   <p class="ft32" style="position:absolute;top:48px;left:799px;white-space:nowrap">
    SA-9
   </p>
   <p class="ft33" style="position:absolute;top:467px;left:43px;white-space:nowrap">
    المواصفات الأساسية
   </p>
   <p class="ft34" style="position:absolute;top:523px;left:43px;white-space:nowrap">
    تصميم خفيف ومريح لسهولة الاستخدام والنقل
   </p>
   <p class="ft35" style="position:absolute;top:566px;left:43px;white-space:nowrap">
    • برميل مطلي بالكروم الصلب المقاوم للتآكل عالي الجودة مع
    <br/>
    سبيكة الميلونيت التي توفر عمرًا طويلاً للبرميل.
    <br/>
   </p>
   <p class="ft34" style="position:absolute;top:631px;left:43px;white-space:nowrap">
    3 أطوال براميل مختلفة لاستخدامات مختلفة.
   </p>
   <p class="ft35" style="position:absolute;top:674px;left:43px;white-space:nowrap">
    بفضل نظام الينابيع العلوية، يتيح إمكانية الاستخدام مع مخزن غير مربوط،
    <br/>
    مخزن قابل للطي أو مخزن تلسكوبي.
    <br/>
   </p>
   <p class="ft35" style="position:absolute;top:739px;left:43px;white-space:nowrap">
    بفضل قضبان بيكاتيني على الأسفل والأعلى والجوانب من البرميل والجزء العلوي، يسمح بتثبيت واستخدام
    <br/>
    معدات إضافية.
    <br/>
   </p>
  </div>
 </body>
</html>
`,
    inline: true,
};

export const Secondary = Template.bind({});
Secondary.args = {};
