ch = new Array
		("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f",
		"g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v",
		"w","x","y","z");

//cookie��ۑ�����,�L�������͔��i�v(2100�N)
function setCookie(cookieName,cookieValue){
	document.cookie = cookieName + "=" + cookieValue
					+ "; expires=Fri, 1-Jan-2100 00:00:00 GMT";
}

//cookie����l(kword)�����o��
function CookieRead(kword){
	if(typeof(kword) == "undefined")		// �L�[���[�h�Ȃ�
		return "";							// �������Ȃ��Ŗ߂�
	kword = kword + "=";
	kdata = "";
	scookie = document.cookie + ";";		// �N�b�L�[����ǂݍ���
	start = scookie.indexOf(kword);			// �L�[���[�h������
	if (start != -1){						// �L�[���[�h�ƈ�v������̂���
		end = scookie.indexOf(";", start);	// ���̖����ʒu������
		kdata = unescape(scookie.substring(start + kword.length, end));  // �f�[�^���o��
	}
  return kdata;
}

//�z��̒��g���R�s�[
function copyArray(array1){
	var array2 = new Array(array1.length);
	var i;
	for(i=0;i<array1.length;i++) array2[i] = array1[i];
	return(array2);
}

//x�����̋󔒂�\��
function blank(x){
	var i;
	for(i=0;i<x;i++) document.write("&nbsp;");
}

//�傫�����̒l��Ԃ�
function max2(a,b){
	if(a>b) return(a);
	else return(b);
}

//���������̒l��Ԃ�
function min2(a,b){
	if(a<b) return(a);
	else return(b);
}

//�T�C�g�X���b�v������𕶎���ɕϊ����ĕԂ�
function toChar(intSS){
	var charSS="";
	var i;
	for(i=0;i<intSS.length;i++){
		if(intSS[i]==-1) charSS += "*";
		else charSS += ch[intSS[i]];
	}
	return(charSS);
}

//a�^�O�t�ŕ������\��
function a(nextUrl,str){
	document.write("<a href=" + nextUrl + ">" + str + "</a>");
}

//a�^�O�t�ŕ������Ԃ�
function a_s(nextUrl,str){
	return("<a href=" + nextUrl + ">" + str + "</a>");
}

//�T�C�g�X���b�v(����)����́A�����N�𐶐����ĕ\��
function a_intSS(intSS){
	var charSS = toChar(intSS);
	var nextUrl = "analyzeSS.html?siteswap1=" + charSS;
	a(nextUrl,charSS);
}

//�T�C�g�X���b�v(����)+�Ђ���́A�����N�𐶐����ĕ\��
function a_charSS1_intTrans_charSS2(charSS1,intTrans,charSS2){
	var charTrans = toChar(intTrans);
	var nextUrl = "analyzeSS.html?siteswap1=" + charSS1
				+ "&trans=" + charTrans
				+ "&siteswap2=" + charSS2;
	var nextString = charSS1 + "-" + charTrans + "-" + charSS2;
	a(nextUrl,nextString);
}

//��̓y�[�W�ւ̃����N("���")�������(1��)
function a_analyze1(charSS1){
	var nextUrl = "analyzeSS.html?siteswap1=" + charSS1;
	var linkString = "<font size=2><a href=" + nextUrl + ">���</a></font>";
	return(linkString);
}

//��̓y�[�W�ւ̃����N("���")�������(���ڐڑ�)
function a_analyze2(charSS1,charSS2){
	var nextUrl = "analyzeSS.html?siteswap1=" + charSS1 + "&siteswap2=" + charSS2;
	var linkString = "<font size=2><a href=" + nextUrl + ">���</a></font>";
	return(linkString);
}

//��̓y�[�W�ւ̃����N("���")�������(�Ђ��ڑ�)
function a_analyze3(charSS1,charTrans,charSS2){
	var nextUrl = "analyzeSS.html?siteswap1=" + charSS1 + "&trans=" + charTrans + "&siteswap2=" + charSS2;
	var linkString = "<font size=2><a href=" + nextUrl + ">���</a></font>";
	return(linkString);
}

//�A�j���[�V�����y�[�W�ւ̃����N("�A�j���[�V����")�������(1��)
function a_juggle1(charSS1){
	var nextUrl = "juggle.html?siteswap1=" + charSS1;
	document.write("<font size=2><a href=" + nextUrl + ">�A�j���[�V����</a></font>");
}

//�A�j���[�V�����y�[�W�ւ̃����N("�A�j���[�V����")�������(���ڐڑ�)
function a_juggle2(charSS1,charSS2){
	var nextUrl = "juggle.html?siteswap1=" + charSS1 + "&siteswap2=" + charSS2;
	document.write("<font size=2><a href=" + nextUrl + ">�A�j���[�V����</a></font>");
}

//�A�j���[�V�����y�[�W�ւ̃����N("�A�j���[�V����")�������(�Ђ��ڑ�)
function a_juggle3(charSS1,charTrans,charSS2){
	var nextUrl = "juggle.html?siteswap1=" + charSS1 + "&trans=" + charTrans + "&siteswap2=" + charSS2;
	document.write("<font size=2><a href=" + nextUrl + ">�A�j���[�V����</a></font>");
}

//�A�j���[�V�����y�[�W�ւ̃����N(�A�j���[�V�����̎�ނɉ����ĕ\��)
function a_juggleX(){
	var nextUrl ="http://murashi1124.hp.infoseek.co.jp/juggle.html";
	switch(SSdata["p"]){
		case 1:		//�ʏ���͎�
			nextUrl +=("?siteswap1=" + SSdata["siteswap1"]);
			break;				
		case 3:		//���ڐڑ���
			nextUrl +=("?siteswap1=" + SSdata["siteswap1"]);
			nextUrl +=("&siteswap2=" + SSdata["siteswap2"]);
			break;
		case 4:		//�Ђ��ڑ���
			nextUrl +=("?siteswap1=" + SSdata["siteswap1"]);
			nextUrl +=("&trans="     + SSdata["trans"]);
			nextUrl +=("&siteswap2=" + SSdata["siteswap2"]);
			break;
		case 7:		//�����_���A�j���[�V������
			nextUrl +=("?mode=r");
			nextUrl +=("&n=" + SSdata["n"]);
			nextUrl +=("&m=" + SSdata["m"]);
			break;
		default:
			break;
	}
	document.write("<font size=2><a href=" + nextUrl + " target='_blank'>jump</a></font>");
}

//���ߍ��݃y�[�W�ւ̃����N
function a_embedX(){
	var nextURL ="http://murashi1124.hp.infoseek.co.jp/embed.html";
	switch(SSdata["p"]){
		case 1:		//�ʏ���͎�
			nextURL +=("?siteswap1=" + SSdata["siteswap1"]);
			break;				
		case 3:		//���ڐڑ���
			nextURL +=("?siteswap1=" + SSdata["siteswap1"]);
			nextURL +=("&siteswap2=" + SSdata["siteswap2"]);
			break;
		case 4:		//�Ђ��ڑ���
			nextURL +=("?siteswap1=" + SSdata["siteswap1"]);
			nextURL +=("&trans="     + SSdata["trans"]);
			nextURL +=("&siteswap2=" + SSdata["siteswap2"]);
			break;
		case 7:		//�����_���A�j���[�V������
			nextURL +=("?mode=r");
			nextURL +=("&n=" + SSdata["n"]);
			nextURL +=("&m=" + SSdata["m"]);
			break;
		default:
			break;
	}
	return(nextURL);
}

//�A�j���[�V�����y�[�W�ւ�URL�𐶐�����(���΃p�X)
//aLink = false�Ȃ�A��̓����N���\���ɂ���
function makeAnimationURL(aLink){
	var nextUrl ="juggle.html";
	switch(SSdata["p"]){
		case 1:		//�ʏ���͎�
			nextUrl +=("?siteswap1=" + SSdata["siteswap1"]);
			if(!aLink) nextUrl += "&a=off";
			break;				
		case 3:		//���ڐڑ���
			nextUrl +=("?siteswap1=" + SSdata["siteswap1"]);
			nextUrl +=("&siteswap2=" + SSdata["siteswap2"]);
			if(!aLink) nextUrl += "&a=off";
			break;
		case 4:		//�Ђ��ڑ���
			nextUrl +=("?siteswap1=" + SSdata["siteswap1"]);
			nextUrl +=("&trans="     + SSdata["trans"]);
			nextUrl +=("&siteswap2=" + SSdata["siteswap2"]);
			if(!aLink) nextUrl += "&a=off";
			break;
		case 7:		//�����_���A�j���[�V������
			nextUrl +=("?mode=r");
			nextUrl +=("&n=" + SSdata["n"]);
			nextUrl +=("&m=" + SSdata["m"]);
			if(!aLink) nextUrl += "&a=off";
			break;
		default:
			if(!aLink) nextUrl += "?a=off";
			break;
	}
	return(nextUrl);
}

//0�`n-1�܂ł̗����𐶐�����
function rand(n){
	var r = Math.floor( Math.random() * n );
	return(r);
}

//��Ԑ�state�́A�{�[���̌�(2�i���ɕϊ������Ƃ���1�̐�)�����߂�
//state��0�ȏ�̐����Ƃ���
function calcBallNumByState(state){
	if(state==0) return(0);
	if(state==1) return(1);
	var ballNum = 1;
	while(state>1){
		state/=2;
		if( state!=Math.floor(state) ) ballNum++;
		state = Math.floor(state);
	}
	return(ballNum);
}

//��Ԑ�state����Ath�̍����œ�������̏�Ԑ���Ԃ�
//�J�ڕs�\�Ȃ�-1��Ԃ�
function transferState(state,th){
	var nextState = (state + a_(th))/2;	
	//����Ԃ��񐮐��Ȃ�J�ڕs��
	if(nextState!=Math.floor(nextState)) return(-1);
	//�O��̏�ԂŃ{�[���̌����ω����Ă�����J�ڕs��
	if( calcBallNumByState(state) != calcBallNumByState(nextState) ) return(-1);
	return(nextState);
}

//�W���O�����O�\���𔻒�
function juggleCheck(intSS){
	var l = intSS.length;
	var i = 0; 
	var j = 0;
	var tmp = new Array(intSS.length);
	for(i=0;i<l;i++) tmp[i] = (intSS[i]+i)%l;
	for(i=0;i<l-1;i++) for(j=i+1;j<l;j++)
		if(tmp[i]==tmp[j]) return(false);
	return(true);
}

//�W���O�����O�\���𔻒�(������)
function charJuggleCheck(charSS){
	var intSS = toEval(charSS);
	return( juggleCheck(intSS) );
}

//�O��̏�Ԑ��ƌЂ���A�J�ډ\�����`�F�b�N
//state1,2�͐�������Ԑ�(0�ȏ�A�{�[������v)�ł��邱�Ƃ�O��Ƃ���
function transCheck(state1,intTrans,state2){
	var i;
	var lt = intTrans.length;
	//�̂�ɏ]���ď�Ԃ�J�ڂ�����
	for(i=0; i<lt; i++){
		state1 = transferState(state1,intTrans[i]);
		if(state1 == -1) return(false);				//�r���őJ�ڕs�ɂȂ�����ڑ��s�Ƃ݂Ȃ�
	}
	if(state1 == state2) return(true);
	else return(false);
}

//���ڐڑ��\���`�F�b�N(�W���O�����O�\���̔�����܂�)
function transCheck2(intSS1,intSS2){
	var jugglable1 = juggleCheck(intSS1);
	var jugglable2 = juggleCheck(intSS2);
	var state1 = calcState(intSS1);
	var state2 = calcState(intSS2);
	if(jugglable1 && jugglable2 && state1==state2) return(true);
	else return(false);
}

//�Ђ��ڑ��\���`�F�b�N(�W���O�����O�\���̔�����܂�)
function transCheck3(intSS1,intTrans,intSS2){
	var jugglable1 = juggleCheck(intSS1);
	var jugglable2 = juggleCheck(intSS2);
	var state1 = calcState(intSS1);
	var state2 = calcState(intSS2);
	var ballNum1 = calcBallNum(intSS1);
	var ballNum2 = calcBallNum(intSS2);	
	var transable = true;		//�ڑ��̉A�s������
	//�O��̃T�C�g�X���b�v���W���O�����O�s���A�{�[�������Ⴆ�ΐڑ��͕K���s��
	if(ballNum1 != ballNum2 || !jugglable1 || !jugglable2){
		transable = false;
	}else{
		transable = transCheck(state1,intTrans,state2);		//�J�ډ\���`�F�b�N
	}		
	return(transable);
}

//SS�̍ŏ��l��Ԃ�(SS�̒�����0�Ȃ�35��Ԃ�)
function calcSSMin(intSS){
	var i,min = 35;
	for(i=0;i<intSS.length;i++){
		if(intSS[i]<min) min = intSS[i];
	}
	return(min);
}

//SS�̍ő�l��Ԃ�(SS�̒�����0�Ȃ�0��Ԃ�)
function calcSSMax(intSS){
	var i,max = 0;
	for(i=0;i<intSS.length;i++){
		if(intSS[i]>max) max = intSS[i];
	}
	return(max);
}

//SS�̍ő�l��Ԃ�2(SS�̒�����0�Ȃ�0��Ԃ�)
function calcSSMax2(intSS1,intSS2){
	var max1 = calcSSMax(intSS1);
	var max2 = calcSSMax(intSS2);
	if(max1>max2) return(max1);
	else return(max2);
}

//SS�̍ő�l��Ԃ�3(SS�̒�����0�Ȃ�0��Ԃ�)
function calcSSMax3(intSS1,intSS2,intSS3){
	var max1_2 = calcSSMax2(intSS1,intSS2);
	var max3 = calcSSMax(intSS3);
	if(max1_2>max3) return(max1_2);
	else return(max3);
}

//�{�[���̌���Ԃ�
function calcBallNum(intSS){
	var i,n = 0;
	for(i=0;i<intSS.length;i++) n += intSS[i];
	n /= intSS.length;
	return n;
}

//��Ԑ���2�i���ɕϊ�����
function calcBinary(state){
	var i=0,b=new Array();
	while(state>1){
		b[i] = state%2;
		state = Math.floor(state/2);
		i++;
	}
	b[i] = Math.floor(state);
	return(b);
}

//a_=2^a-1
function a_(a){
  var r;
  r = Math.pow(2,a)-1;
  return(r);
}

//�����I�ȃT�C�g�X���b�v�̏�Ԑ����v�Z
function calcState(intSS){
	var i,r=0;
	for(i=0;i<intSS.length;i++) r += Math.pow(2,i)* a_(intSS[i]);
	r /= a_(intSS.length);
	//����̒l�̂Ƃ��ɐ����ɂȂ�Ȃ����ɑΏ����邽�߂Ɏl�̌ܓ�
	r = Math.round(r);
	return(r);
}

//�A���t�@�x�b�g1�����𐔎��ɕϊ�(0��0,1��1,�c,a��10,b��11�c)
//�u�����N���[�h(*)��-1
function alpha2eval(input){
	var a;
	var c = input.charAt(0);
	if(c=="*"){
		a = -1;
	}else{	//�ʏ�̃A���t�@�x�b�g
		a = input.charCodeAt(0);
		if(a<=57) a-=48;			//0��48�ɑΉ�
		else a-=87; 				//a��97�ɑΉ�
	}
	return(a);
}

//�^����ꂽ�T�C�g�X���b�v������𐔎��ɕϊ����A�z��Ɋi�[���ĕԂ�
function toEval(charSS){
	var charSS=charSS.toLowerCase();		//�������ɕϊ�
	var i;
	var intSS = new Array(charSS.length);
	for(i=0; i<charSS.length; i++){
		intSS[i] = alpha2eval(charSS.charAt(i));
	}
	return(intSS);
}

//�w�肳�ꂽ���b�Z�[�W��\��
function dispMessage(message){
	document.getElementById("messageArea").innerHTML = 
	'<p><font color=red>' + message + '</font></p>';
}

//���̓`�F�b�N
//1:�ʏ���́A2:*�t�A-1:�֎~��������A-2:null�����A-3:�󕶎��A-4:*��9�ȏ�A-5:*��6�ȏ�
function inputCheck(input){
	if(input == null) return(-2);		//null�̏ꍇ
	if(input.length==0) return(-3);		//�󕶎��̏ꍇ
	var reg = RegExp("^[0-9a-zA-Z]*$");
	var reg2 = RegExp("^[0-9a-zA-Z*]*$");
	if (input.match(reg)) {
	    return(1);			//����OK
	} else if(input.match(reg2)){	
		var i,astaNum=0;
		for(i=0;i<input.length;i++) if( input.charAt(i)=="*" ) astaNum++;
		if(astaNum>9) return(-4);			//*����������ꍇ�̓G���[
		else if(astaNum>6) return(-5);
		else return(2);						//����OK *�t��
	} else {
	    return(-1);			//�֎~����
	}
}

//URL�̈������擾����N���X
function getHikisuu(){
     getHikisuu.data = new Array();
     getHikisuu.string = location.search.substring(1);		//?���T�v���X
     getHikisuu.string = getHikisuu.string.split('&');
     for(var i = 0; i != getHikisuu.string.length; i++) {
         getHikisuu.data[ck_shikibetushi(getHikisuu.string[i].split('=')[0])] 
                               =  Escape(unescape(getHikisuu.string[i].split('=')[1]));
     }
     function ck_shikibetushi(shiki){ //���ʎq�i�v���p�e�B�j�̖����`�F�b�N
         shiki_TOP = shiki.substring(0,1);
         if(shiki_TOP.match(/[a-zA-Z_$]/g) == null){
            return null;
         }
         else if(shiki.match(/[^a-zA-Z0-9_$]/g) != null){
            return null;
         } 
         return shiki;
     }
     function Escape(str){ //�����Q�Ƃ֕ϊ� 
          str = str.replace( /\&/g, '&amp;' );
          str = str.replace( /</g, '&lt;' ); 
          str = str.replace( />/g, '&gt;' ); 
          str = str.replace( /\"/g, '&quot;' );
          str = str.replace( /\'/g, '&#39;' );
          return str;
    }
}

//URL����͂��A�K�v�ȃp�����[�^�͘A�z�z��Ɋi�[���ĕԂ�
//1:�ʏ���́A2:*�t�A3:���ڐڑ��A4:�Ђ��ڑ��A5:*�t�ڑ��A6:�ŒZ�ڑ������A7:�����_���A�j���[�V�����\��
//0:�����Ȃ��A-1:�֎~��������A-4:*�t(������)
function analyzeURL(){
	//URL���
	new getHikisuu();	
	var siteswap1 = getHikisuu.data.siteswap1;
	var trans     = getHikisuu.data.trans;
	var siteswap2 = getHikisuu.data.siteswap2;
	var mode      = getHikisuu.data.mode;
	var n         = getHikisuu.data.n;
	var m         = getHikisuu.data.m;
	var a         = getHikisuu.data.a;

	//1:�ʏ���́A2:*�t�A-1:�֎~��������A-2:null�����A-3:�󕶎�
	//-4:*��9�ȏ�A-5:*��6�ȏ�	
	var check1    = inputCheck(siteswap1);		//SS(�O��)
	var checkt    = inputCheck(trans);			//SS(�ڑ�)
	var check2    = inputCheck(siteswap2);		//SS(�㔼)
	var checkmode = inputCheck(mode);			//���[�h
	var checkn    = inputCheck(n);				//�{�[���̌�
	var checkm    = inputCheck(m);				//�����̍ő�l
	var p;

	//�֑�������1�ł���������\���G���[
	if(check1==-1 || checkt==-1 || check2==-1 || checkmode==-1){
		p=-1;
	}
	//�����_���A�j���[�V�����\��
	else if(mode=="r"){
		p=7;
		var flag_n = false,flag_m = false;
		//�{�[�����ɃG���[�����񂪂������ꍇ�͌�3�Ƃ���
		if(checkn!=1){
			flag_n = true;
		}else{
			n = "" + parseInt(n);
			//�{�[�����͐��l(�A���t�@�x�b�g���܂܂Ȃ�)�ł���K�v������
			if(n=="NaN") flag_n = true;
		}
		//�ő卂���ɃG���[�����񂪂������ꍇ�͍ő�l7�Ƃ���
		if(checkm!=1){
			flag_m = true;
		}else{
			m = "" + parseInt(m);
			//�ő卂���͐��l(�A���t�@�x�b�g���܂܂Ȃ�)�K�v������
			if(m=="NaN") flag_m = true;
		}
		//���A�����Ƃ��ɃG���[�̏ꍇ�͌Œ�l��ݒ�
		if(flag_n && flag_m){
			n="3";
			m="7";
		}
		//���̂݃G���[�̏ꍇ�͌���3(����������2�ȉ��Ȃ獂���Ɠ���)
		else if(flag_n && !flag_m){
			if( parseInt(m)<=2 ){
				n=m;
			}else{
				n="3";
			}
		}
		//�����̂݃G���[�̏ꍇ�͍����͌�+4(���������̌��ʂ�36�ȏ�Ȃ�35)
		else if(!flag_n && flag_m){
			m = parseInt(n) + 4 + "";
			if( parseInt(m)>35 ){
				m="35";
			}
		}
	}
	//���͂�1���Ȃ������ꍇ
	else if(check1==-2 && checkt==-2 && check2==-2){
		p=0;
	}
	//�Ђ��ڑ�
	else if(check1==1 && checkt==1 && check2==1){
		p=4;
	}
	//*���ڑ�
	else if(check1==1 && checkt==2 && check2==1){
		p=5;	//���Ƃ�5�ɕς���
	}
	//*���ڑ�����*����������
	else if(check1==1 && checkt==-5 && check2==1){
		p=-4;
	}	
	//�ŒZ�ڑ�����
	else if(check1==1 && checkt==-3 && check2==1){	
		p=3;	//���Ƃ�6�ɕς���
	}
	//���ڐڑ�
	else if(check1==1 && checkt==-2 && check2==1){
		p=3;
	}
	//�ʏ����
	else if(check1==1){
		p=1;
	}
	//*�t
	else if(check1==2){
		p=2;
	}
	//*�����������ꍇ
	else if(check1==-4){
		p=-4;
	}
	//*�t�ŁA�Е����Ƃ��Ă͑������ʏ�u�����N�����ɂ͖��Ȃ��ꍇ
	else if(check1==-5){
		p=2;
	}
	else{
		p=0;
	}

	//���͗��̕\�����𐧌�(�l����ł��A�p�����[�^��������Γ��͗���\������)
	var inputAreaNum;
	if(check1!=-2 && checkt!=-2 && check2!=-2)	inputAreaNum = 3;
	else if(check1!=-2 && check2!=-2)			inputAreaNum = 2;
	else if(check1!=-2)							inputAreaNum = 1;
	else										inputAreaNum = 1;

	//null�l���������ꍇ�͋󕶎��ɕϊ����Ă���
	if(siteswap1 == null) 	siteswap1 = "";
	if(trans == null)		trans = "";
	if(siteswap2 == null) 	siteswap2 = "";	

	//"�A�j���[�V�����\���̍ۂɁA�u��́v�����N���o���Ȃ�"�t���O
	if(a=="off") a = true;
	else a = false;

	//�^�C�g����ݒ肷��
	var title ="";
	if(p==1 || p==2) title = siteswap1 + " :";
	else if(p==3)    title = siteswap1 + "-" + siteswap2 + " :";
	else if(p==4 || p==5)    title = siteswap1 + "-" + trans + "-" + siteswap2 + " :";
	else if(p==7) title = "�����_��(" + n +"ball,max" + m +") :";
	title += "�T�C�g�X���b�v���onWEB";

	//�f�[�^�i�[
	var SSdata = new Object();				//�A�z�z���`
	SSdata["siteswap1"]		= siteswap1;
	SSdata["trans"]			= trans;
	SSdata["siteswap2"]		= siteswap2;
	SSdata["p"]				= p;			//�\����Ԃ��`
	SSdata["inputAreaNum"]	= inputAreaNum;
	SSdata["n"]				= n;
	SSdata["m"]				= m;
	SSdata["title"]			= title;
	SSdata["analyzeOff"]	= a;

	return(SSdata);
}

//�z��a�̒���0�������Ă��镔�����烉���_����1�ӏ��I��ŃC���f�b�N�X��Ԃ�
//n�͏��( a={1,1,0,1,0,0,1,0,0}�An=7�Ȃ�A0�`6�̒���0�̂��̂���1�I��(2,4,5�̂ǂꂩ)
//      index 0,1,2,3,4,5,6,7,8�c
function randomArrayIndex(a,n){
	var idx = new Array();
	var count,i,j = min2(n,a.length);
	//�C���f�b�N�X���i�[����z����쐬�A���̌����v�Z
	count = 0;
	for(i=0;i<j;i++){
		if(a[i]==0){
			idx[count]=i;
			count++
		}
	}
	//�����_����1�I��ŕԋp
	if(count==0) return(-1);		//��₪�Ȃ������ꍇ��-1��Ԃ�
	else return(idx[rand(count)]);
}

//�z��a�̒���0�������Ă��镔�����烉���_����1�ӏ��I��ŃC���f�b�N�X��Ԃ�
//�������A����܂łɏo�Ă���1�̌������Ȃ��قǍ��m���őI�΂��
function randomArrayIndexLessZero(a,n){
	var idx = new Array(),weight= new Array();
	var count,i,j = min2(n,a.length),k;
	//�C���f�b�N�X���i�[����z����쐬�A���̌����v�Z
	count = 0;	//0�̌�
	k = 1;		//����܂łɏo�Ă���1�̌�
	for(i=0;i<j;i++){
		if(a[i]==0){
			idx[count]=i;
			weight[count]=1/(k*k*k*k);	//1�̌������Ȃ��قǑ傫�Ȑ��ɂ��邽�߂ɋt�����Ƃ�
			count++
		}else{
			k++;
		}
	}
	//�����_����1�I��ŕԋp
	if(count==0) return(-1);		//��₪�Ȃ������ꍇ��-1��Ԃ�
	else return( idx[calcRandomWeightArray(weight)] );
}

//SS�A���(�z��)���󂯎��A����1��𐶐��A
//SS�͖����Ɏ���1���ǉ��A��Ԃ͍X�V����Bmax�͍����̍ő�l
function calcRandomNextSS(ss,state,max){
	var next;
	var throwFlag = state[0];
	//��ԑJ��(1���V�t�g���Đ擪��؂�̂�)
	state.shift();
	state.push(0);
	
	//��Ԃ̐擪��0�Ȃ�A����1���0(�����Ȃ�)
	if(throwFlag==0){
		next = 0;
	}else{
		//����1����߂�
		if(lessZeroFlag){
			//�[�������Ȃ�����
			next = randomArrayIndexLessZero(state,max) +1;
		}else{
			//�S�ċϓ��Ȋm���Ő���
			next = randomArrayIndex(state,max) +1;
		}
		//��Ԃ��X�V
		state[next-1] = 1;
	}
	//����1���SS�̖����ɒǉ�
	ss.push(next);
}

//�z����󂯎��A���̒��g�̔䗦�Ń����_���ɃC���f�b�N�X��Ԃ�
//{2,1,3,2,2}�Ȃ�A2���Ԃ�m������ԍ���
//{0,1,2,3,4}
function calcRandomWeightArray(array){
	var i,sum=0,x=0,idx;
	//���v�l���v�Z
	for(i=0;i<array.length;i++) sum += array[i];
	//0�`1�܂ł̗����𐶐�
	var r=Math.random();
	//�m���𐳋K�����ĉ��Z�A���ڂ��v�Z����index��Ԃ�
	var idx;
	for(i=0;i<array.length;i++){
		x+=array[i]/sum;		
		if(r<x){
			idx=i;
			break;
		}
	}
	return(idx);
}

//1�̃T�C�g�X���b�v�����i�[����N���X
var SS = function(stringSS){
	//�R���X�g���N�^
	this.str = stringSS;

	//�{�[���ʒu�𒲐�
	this.test = function(){
		alert(this.x);
	}
}
