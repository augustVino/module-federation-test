export default function () {
  return {
    name: 'change-script-attribute',
    createScript({ url }) {
      console.log('url', url);
      //   if (url === testRemoteEntry) {
      //     let script = document.createElement('script');
      //     script.src = testRemoteEntry;
      //     script.setAttribute('loader-hooks', 'isTrue');
      //     script.setAttribute('crossorigin', 'anonymous');
      //     return script;
      //   }
    }
  };
}
