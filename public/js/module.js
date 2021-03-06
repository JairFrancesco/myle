'use strict';

var myApp = angular.module('myApp', ['ngRoute', 'pretty-checkable', 'ngResource', 'angucomplete-alt',
	'angularUtils.directives.dirPagination',
    'uiGmapgoogle-maps',
    'angular-media-preview',
    'naif.base64',
    "ngAnimate",
    "toaster",
    "angularMoment",
    "ngSanitize",
    "ui.select",
    "irontec.simpleChat",
    "ui.bootstrap",
    "angular-loading-bar",
    "720kb.socialshare",
    "pascalprecht.translate"
]);

myApp.run(function(amMoment) {
    amMoment.changeLocale('fr');
});

myApp.value('AdressSearch',{});
myApp.value('TagSearch',{});
myApp.value('AuthenticatedUser',{});

myApp.run(function($rootScope) {
	//{_id:"56e54c193ba5bc24265767f2", name:"Bizerte", type:1}
	var adressId=getCookie('adressId');
	var adressName=getCookie('adressName');
	var adressType=getCookie('adressType');

	var tagId=getCookie("tagId");
	var tagName = getCookie("tagName");

    if(typeof adressId == 'undefined' ||  adressId == null ||  adressId == ''||
       typeof adressName == 'undefined' ||  adressName == null ||  adressName == ''||
       typeof adressType == 'undefined' ||  adressType == null ||  adressType == ''){
        setCookie('adressId','56e54c183ba5bc24265767ec',7 );
    	setCookie('adressName','Tunis',7 );
    	setCookie('adressType',1,7 );
    }
    if(typeof tagId == 'undefined' ||  tagId == null ||  tagId == ''||
       typeof tagName == 'undefined' ||  tagName == null ||  tagName == ''){
       	$rootScope.TagSearch=null;
    }
    else{
    	$rootScope.TagSearch={id:tagId, name:tagName};
    }
    $rootScope.AdressSearch={id:adressId, name:adressName, type:adressType};
});

myApp.run(function ($rootScope, $location, loginService) {
  $rootScope.$on('$routeChangeStart', function (event, next) {
      if ($rootScope.AuthenticatedUser!= null) {
          //$state.go('login');
          //$location.path("/login");
      }
      else{
        var r = loginService.isLoged().get({}, function(){
            if(r.status==false){
                $rootScope.AuthenticatedUser=null;     
                if(next.templateUrl =="partials/user/profile.html" || 
                  next.templateUrl =="partials/user/seting.html"){
                    $location.path("/login/sign_in");
                }
            }
            else{
                $rootScope.AuthenticatedUser = {
                        id:r.user._id,
                        firstName:r.user.firstName,
                        lastName:r.user.lastName,
                        profileImage:r.user.profileImage
                };  
            }
        });


      }
      
  });
})

myApp.config(['$translateProvider', function ($translateProvider) {
  $translateProvider.translations('en', {
    'about': 'About',
    'about-d': 'Myle is a community and participatory platform sharing opinions, experiences and information online which includes all shops and local services in Tunisia.',
    'contact':'Contact us',
    'stay':'Stay connected',
    'langue':'Language',
    
    'right':'All rights reserved.',
    'home':'Home',
    'terms':'Terms & Conditions'
  });
 
  $translateProvider.translations('fr', {
    'about': 'A propos',
    'about-d': 'Myle est une plateforme communautaire et participative de partage d’avis, d’expériences et d’information en ligne qui regroupe tous les commerces et les services de proximité en Tunisie.',
    'contact':'Contacter nous',
    'stay':'Rester Connecter',
    'langue':'Langue',
    
    'right':'Tout droit reservé.',
    'home':'Accueil',
    'terms':'Termes & Conditions'
  });
 
  $translateProvider.preferredLanguage('fr');
}]);



function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}