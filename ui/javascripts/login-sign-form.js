(function(){
	glb.isnotishow = false;
	glb.shownoti = function (text,time,showcancel){
		glb.isnotishow = true;
		document.getElementsByClassName('uniclose')[0].style.display='none';
		var g = document.getElementsByClassName('uninoti')[0];
		g.classList.add('shownoti');
		document.getElementsByClassName('unitext')[0].innerHTML = text;
		if(showcancel == 'y'){
			document.getElementsByClassName('uniclose')[0].style.display='block';
		}
		if(typeof(time) == 'number'){
			setTimeout(glb.hidenoti,time);
		}
	}

	glb.hidenoti = function (){
		if(glb.isnotishow){
			glb.isnotishow = false;
			var g = document.getElementsByClassName('uninoti')[0];
			g.classList.add('hidenoti');
			setTimeout(function(){
				g.classList.remove('shownoti');
				g.classList.remove('hidenoti');
			},200)
		}
	}

    function handlelogin(data){
    	data = JSON.parse(data);
    	if(data.err){
    	    $('.overpg').css('display','none');
    		glb.shownoti(data.errdes,'','y');
    	}else{
			window.location.reload();
    	}
    }

	glb.login = function(webid,data){
		var sendata = {};
		if(!glb.isloggedin()){
			if(webid === 0){
				if(req=true){
					req=false;
					sendata.email = data.email;
			     	sendata.usernm = data.usrnm;
			     	sendata.webid = 0;
			     	sendata.pass = data.pass;
			     	glb.submitanything('777',handlelogin,'POST',sendata);
			     	$('.overpg').css('display','block');
		     	}
			}else if(webid === 1){
				if (auth2.isSignedIn.get()) {
					var profile = auth2.currentUser.get().getBasicProfile();
					sendata.userwebid = profile.getId();
					sendata.usernm = profile.getName();
					sendata.picture = profile.getImageUrl();
					sendata.email = profile.getEmail();
					sendata.webid = 1;
			     	glb.submitanything('777',handlelogin,'POST',sendata);
			     	$('.overpg').css('display','block');
				}else{
					
				}
			}else if(webid === 2){
				FB ? FB.api("/"+FB.getUserID()+"?fields=id,picture,gender,email,name", function(response) {
					if(!!response.error){
					}else{
				     	sendata.email = response.email;
				     	sendata.usernm = response.name;
				     	sendata.webid = 2;
				     	sendata.picture = response.picture.data.url;
				     	sendata.userwebid = response.id;
				     	glb.submitanything('777',handlelogin,'POST',sendata);
				     	//glb.shownoti('Password is matching','','y');
				     	$('.overpg').css('display','block');
					}
			    }) : '';
			}else if(webid === 3){
				if(req=true){
					req=false;
					glb.submitanything('776',handlelogin,'POST',{webid:0,email:data.usrnm,pass:data.pass});
				}
			}
		}
	}

	document.getElementsByClassName('uniclose')[0].onclick = glb.hidenoti;

    function showsignform() {
        document.getElementsByClassName('loginform')[0].style.display='block';
        document.getElementsByClassName('logninpro')[0].style.display='none';
        document.getElementsByClassName('signuppro')[0].style.display='block';
    }
    function showlogform(){
        document.getElementsByClassName('loginform')[0].style.display='block';
        document.getElementsByClassName('signuppro')[0].style.display='none';
        document.getElementsByClassName('logninpro')[0].style.display='block';
    }
    function closebothform(){
        document.getElementsByClassName('loginform')[0].style.display='none';
        document.getElementsByClassName('signuppro')[0].style.display='none';
        document.getElementsByClassName('logninpro')[0].style.display='none';
    }

    document.getElementById('ussignup').onclick = showsignform; 
    document.getElementById('uslogin').onclick = showlogform;
    document.getElementsByClassName('loginfirst')[0].onclick = showlogform;
    document.getElementsByClassName('singupfirst')[0].onclick = showsignform;
    var closebtns = document.getElementsByClassName('formclose');

    for(var i=0;i<closebtns.length;i++){
        closebtns[i].onclick = closebothform;
    }

    function isValidEmail(mail){
    	return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
    }

    req = false;
    document.forms[0].onsubmit = function(e){
        e.preventDefault();
        e.stopPropagation();
        var data = {};
        data.usrnm = document.getElementsByClassName('usrnmlog')[0].value;
        data.pass = document.getElementsByClassName('usrpsslog')[0].value;
        if(isValidEmail(data.usrnm))
            if(data.pass.length > 0){
                req = true;
            	glb.login(3,data);
            }else{
                glb.shownoti('Please Enter the password','','y');
            }
        else{
            glb.shownoti('Please Enter valid email address','','y');
        }
    }

    document.getElementsByClassName('usrnmlog')[0].onfocus = glb.hidenoti;
    document.getElementsByClassName('usrpsslog')[0].onfocus = glb.hidenoti;

    document.forms[1].onsubmit = function(e){
    	e.preventDefault();
        e.stopPropagation();
        var data = {};
        data.usrnm = document.getElementsByClassName('usrnmsign')[0].value;
        data.pass = document.getElementsByClassName('usrpsssign')[0].value;
        data.email = document.getElementsByClassName('usersignemail')[0].value;
        if(data.usrnm.length > 0){
        	if(isValidEmail(data.email)){
	        	if(data.pass.length > 0){
	        		if( data.pass === document.getElementsByClassName('usrrpsssign')[0].value ){
	        			req = true;
	        			glb.login(0,data);
	        		}else{
	        			glb.shownoti('Password is matching','','y');
	        		}
	        	}else{
	        		glb.shownoti('Please Enter the password','','y');
	        	}
        	}else{
        		glb.shownoti('Please Enter valid email address','','y');
        	}
        }else{
        	glb.shownoti('Please Enter the your name','','y');
        }
    }

    document.getElementsByClassName('usrnmsign')[0].onfocus = glb.hidenoti;
    document.getElementsByClassName('usersignemail')[0].onfocus = glb.hidenoti;
    document.getElementsByClassName('usrpsssign')[0].onfocus = glb.hidenoti;
    document.getElementsByClassName('usrrpsssign')[0].onfocus = glb.hidenoti;


	document.getElementById('logoutbtn').onclick = function(){
		if(glb.isloggedin()){
			var webid = glb.userInfo.webid;
			if(webid == 2 ){
				if(FB){
					FB.getLoginStatus(function(r){
						if(r.status=="connected"){
							FB.logout(function(response){
								location.replace('http://satyabhushan.imad.hasura-app.io/logout/'+encodeURIComponent(window.location.href))
							})
						}else{
							location.replace('http://satyabhushan.imad.hasura-app.io/logout/'+encodeURIComponent(window.location.href))
						}
					})
				}else{
					location.replace('http://satyabhushan.imad.hasura-app.io/logout/'+encodeURIComponent(window.location.href))
				}
			}else if(webid == 1 ){
				var auth2 = gapi.auth2.getAuthInstance();
			    auth2.signOut().then(function () {
			      	location.replace('http://satyabhushan.imad.hasura-app.io/logout/'+encodeURIComponent(window.location.href))
			    });
			}else{
				location.replace('http://satyabhushan.imad.hasura-app.io/logout/'+encodeURIComponent(window.location.href))
			}
		}
	}
  
})()


window.fbAsyncInit = function() {
	FB.init({
		appId      : '1340734889294057',
		xfbml      : true,
		version    : 'v2.6'
	});
};
(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
function checkLoginState() {
	FB.login(function(response) {
	    if(response.status =="connected"){
	    	glb.login(2);
	    }
	}, {
	    scope: 'public_profile,email', 
	    return_scopes: true
	});
}
var googleUser = {};
var startApp = function() {
	gapi.load('auth2', function(){
		auth2 = gapi.auth2.init({
			client_id: '6592700229-sq2acbb8tqqgehqm8agvmrp5io4gj1u5.apps.googleusercontent.com',
			cookiepolicy: 'single_host_origin',
		});
		attachSignin(document.getElementById('my-goog'));
	});
};
var startApp2 = function() {
	gapi.load('auth2', function(){
		auth2 = gapi.auth2.init({
			client_id: '6592700229-sq2acbb8tqqgehqm8agvmrp5io4gj1u5.apps.googleusercontent.com',
			cookiepolicy: 'single_host_origin',
		});
		attachSignin(document.getElementById('my-goog2'));
	});
};
function attachSignin(element) {
	auth2.attachClickHandler(element, {},
		function(googleUser) {
			glb.login(1);
		}, function(error) {
			glb.shownoti('Right now you can\'t login with google. Please try again later.')		
		}
	);
}
startApp2();
startApp();
