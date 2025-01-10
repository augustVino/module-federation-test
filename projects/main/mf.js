export default function () {
  return {
    name: 'change-script-attribute',
    createScript({ url }) {
      //   if (url.indexOf(':8002') > -1) {
      //     debugger;
      //   }
      let script = document.createElement('script');
      script.src = url;
      script.setAttribute('loader-hooks', 'isTrue');
      script.setAttribute('crossorigin', 'anonymous');
      console.log('main-url', url, script);
      return script;
    }
    // async beforeLoadShare(args) {
    //   console.log('beforeLoadShare', args);
    //   //   if (url.indexOf(':8002') > -1) {
    //   //   debugger;
    //   //   }
    //   return args;
    // }
  };
}
