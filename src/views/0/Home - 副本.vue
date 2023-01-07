<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    
 
    
    <br><br><br>
    <button @click="tujingling">图精灵</button>
    




  </div>
</template>

<script>
// @ is an alias to /src

import {mapActions} from 'vuex'
import axios from 'axios';
export default {
  name: 'Home',
  methods:{
    ...mapActions([
      'queryFood'
    ]),


    async tujingling(){
      console.log( ' getBaiduList  -->> ',  );
      const response = await axios({
			    method: 'get',
			    url: '/tujingling/ieat',
			});
			console.log( ' getBaiduList response -->> ', response );
    },





    async flickr(){
      const query = 'food';
      const response = await axios({
			    method: 'get',
			    url: encodeURI(`/flickr/services/rest?sort=relevance&parse_tags=1&content_type=7&extras=can_comment%2Ccan_print%2Ccount_comments%2Ccount_faves%2Cdescription%2Cisfavorite%2Clicense%2Cmedia%2Cneeds_interstitial%2Cowner_name%2Cpath_alias%2Crealname%2Crotation%2Curl_sq%2Curl_q%2Curl_t%2Curl_s%2Curl_n%2Curl_w%2Curl_m%2Curl_z%2Curl_c%2Curl_l&per_page=25&page=1&lang=zh-HK&text=food&viewerNSID=&method=flickr.photos.search&csrf=&api_key=7774f72dfd280c8b9290ec71d754a44f&format=json&hermes=1&hermesClient=1&reqId=fb302282-050d-4755-9ccc-dea7b68baa90&nojsoncallback=1`),
			});
			console.log( ' getBaiduList response -->> ', response );
    },

    async findFood(){
      const query = 'food';
      // this.queryFood('food');  
// url: encodeURI(`/shutterstock/_next/data/zfGSkHPLqT6HkIfhppaw-/zh/_shutterstock/search/${query}.json?term=${query}`),
      const response = await axios({
			    method: 'get',
			    url: encodeURI(`/shutterstock/_next/data/zfGSkHPLqT6HkIfhppaw-/zh/_shutterstock/search/${query}.json?term=${query}`),
			});
			console.log( ' getBaiduList response -->> ', response );
    },


    async beforeShutterstock(){
      const time = new Date();
      const timeStr = `2022-01-07T17:${time.getMinutes()}:${time.getSeconds()}.${time.getMilliseconds()}Z`;

      const data = {
        anonymousId: "982acc4a-9589-4111-a7b8-7ba4d640bd19",
        context:{
          library: {name: "analytics.js", version: "next-1.31.2"},
          locale: "zh-CN",
          page:{
            path: "/zh/search/food+icon",
            referrer: "https://www.google.com.hk/",
            search: "",
            title: "Food icon 图片、库存照片和矢量图 | Shutterstock",
            url: "https://www.shutterstock.com/zh/search/food+icon",
          },
          userAgent: "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36"
        },
        event: "click",
        integrations:{
          'Extole Platform': true,
          'Google Analytics': {clientId: "521164957.1641571484"},
          'Google Analytics 4': true,
          'Google Tag Manager': true,
          Pendo: true,
          'Personas Website Facebook Ads': true,
          Responsys: true,
          Webhooks: true,
        },
        messageId: "ajs-next-5f8a232ef2f99a9a8e20dff2feb82045",
        properties:{
          eventAction: "click",
          eventCategory: "userInteraction",
          eventLabel: "textField"
        },
        page:{
          applicationName: "next-web",
          currentUrl: "https://www.shutterstock.com/search/food+icon",
          environment: "production",
          isAdult: null,
          isSensitive: false,
          originalUrl: "https://www.shutterstock.com/zh?kw=shutterstock&c3apidt=p19994882553&gclid=EAIaIQobChMIl72irIKg9QIVQ3ZgCh00RwPHEAAYASAAEgKUo_D_BwE&gclsrc=aw.ds",
          pageLanguage: "zh",
          pageType: "search",
          previousUrl: "https://www.shutterstock.com/search/food+icon",
          referringUrl: "https://www.google.com.hk/",
          site: "shutterstock",
          subPage: "image"
        },
        pageSection: "searchBar",
        sstk_session_id: "5cb2281a-abce-46ec-b04b-0a8bce42314a",
        uiEventName: "click.searchBar.textField",
        user: {id: "", status: "guest", isActive: "false", isImpersonated: false},
        visit:{
          basket: "PPC_GOO_CN_BD",
          carton: "346580951407",
          egg: "ec",
          geoLocationCountryCode: "us",
          parameters: {kw: "shutterstock", gclid: "EAIaIQobChMIl72irIKg9QIVQ3ZgCh00RwPHEAAYASAAEgKUo_D_BwE", gclsrc: "aw.ds"},
          site: "www.shutterstock.com",
          visitId: "74084659633",
          visitorId: "67806720648",
        },
        sentAt: timeStr,
        timestamp: timeStr,
        type: "track",
        userId: null,
        writeKey: "lFTXgrAwP7dIiZpQj0jyXTUUJlJbWavU",
        _metadata:{
          bundled: ["Google Tag Manager", "Pendo", "Segment.io"],
          bundledIds: ["60db4c38ec2200f88185fe53", "61bba9960dafff307b48c07c"],
          unbundled: []
        }
      };
      const response = await axios({
			    method: 'POST',
			    url: '/beforeShutterstock/v1/t',
          data
			});
			console.log( ' getBaiduList response -->> ', response );
      
      
			console.log( ' getBaiduList timeStr -->> ', timeStr );
      

    },




    async getBaiduList(){
			const response = await axios({
			    method: 'get',
			    url: encodeURI('/baidu/s?&wd=kaseya'),
			});
			console.log( ' getBaiduList response -->> ', response );
		}

  }
}
</script>


<style lang="less" scoped>

</style>
