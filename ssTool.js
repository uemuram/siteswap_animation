//�O���[�o���ϐ���`
var width = 25;						//�T�C�g�X���b�v�\���̈�̉���
var Hmax = 9;						//�����̏��
var Hmin = 0;						//�����̉���
var BlankMax = 250;					//���H���T�C�g�X���b�v�\�����̏��
var BlankMax2 = 100;				//���H���Ђ̕\�����̏��
var otherWindowFlag = false;		//���̃E�B���h�E�ŃA�j���[�V������\�����邩�����肷��t���O
var otherWindow;					//�A�j���[�V�����\���p�̕ʃE�B���h�E

widthData = new Array(8);		//�T�C�g�X���b�v�\���̈���`
widthData[0] = "5";
widthData[1] = "10";
widthData[2] = "15";	
widthData[3] = "20";
widthData[4] = "25";
widthData[5] = "30";
widthData[6] = "35";
widthData[7] = "40";		


//cookie��\�����ăA���[�g���o��
function viewCookie(){
      alert(CookieRead("inputSwap"));
}		

//������̑O��̃X�y�[�X(�S�p�A���p)����菜��
function removeSpace(input){
	var i;
	//�擪����X�y�[�X�����O
	for(i=0;i<input.length;i++){
		if(input.charAt(i)!=" " && input.charAt(i)!="�@") break;
	}
	input = input.substring(i,input.length);
	//��������X�y�[�X�����O
	for(i=input.length-1;i>=0;i--){
		if(input.charAt(i)!=" " && input.charAt(i)!="�@") break;
	}
	input = input.substring(0,i+1);
	return(input);
}

//�󂯎�����e�L�X�g�G���A���̃W���O�����O�\���𔻒肵�āA
//�\�ł���΃G���A���̔w�i�F��ς���B�s�ł���Δw�i�F�𔒂ɂ���
function changeTextAreaColor(textArea){
	//�ʏ����(���ꕶ���Ȃ�)�łȂ��ꍇ
	if(inputCheck(textArea.value)!=1){
		textArea.style.background="";
		return;
	}
	var intSS = toEval(textArea.value);
	//�W���O�����O�s�̏ꍇ
	if(!juggleCheck(intSS)){
		textArea.style.background="";
		return;
	}
	//�W���O�����O�\�������ꍇ�͐F��ς���
	textArea.style.background="#FFECEC";
}

//�󂯎�����e�L�X�g�G���A��(�ڑ�����)�ƁA�O���SS�̐ڑ��\���𔻒肵�āA
//�\�ł���΃G���A���̔w�i�F��ς���B�s�ł���Δw�i�F�𔒂ɂ���
function changeTextAreaColor2(textArea){
	//�ʏ����(���ꕶ���Ȃ�)�łȂ��ꍇ
	if(inputCheck(textArea.value)!=1						||		//�ڑ�
	   inputCheck(document.siteswapForm.siteswap1.value)!=1	||		//�O��
	   inputCheck(document.siteswapForm.siteswap2.value)!=1)		//�㔼
	{
		textArea.style.background="";
		return;
	}		
	var intSS1 = toEval(document.siteswapForm.siteswap1.value);
	var intTrans = toEval(textArea.value);
	var intSS2 = toEval(document.siteswapForm.siteswap2.value);
	//�ڑ��s�̏ꍇ
	if(!transCheck3(intSS1,intTrans,intSS2)){
		textArea.style.background="";
		return;
	}
	//�ڑ��\�������ꍇ�͐F��ς���
	textArea.style.background="#ECFFFB";
}

//�e�L�X�g�G���A���ŃL�[�������ꂽ�ꍇ�̏���(�O��SS�̃��A���^�C������)
function keyTouch(e,inputAreaNum,textArea){
	//�G���^�[�L�[��������Ă����ꍇ�A�J�ڂ�����
	if (!e) var e = window.event;
	if(e.keyCode == 13){
		move(inputAreaNum);
		return false;
	}
	//�G���^�[�L�[�ȊO��������Ă����ꍇ�́A�W���O�����O�\�������A���^�C������
	changeTextAreaColor(textArea);
	//���͗���3�������ꍇ�͐ڑ�������s��
	if(inputAreaNum>=3){
		changeTextAreaColor2(document.siteswapForm.trans);
	}
}

//�e�L�X�g�G���A���ŃL�[�������ꂽ�ꍇ�̏���2(�ڑ��̃��A���^�C������)
function keyTouch2(e,inputAreaNum,textArea){
	//�G���^�[�L�[��������Ă����ꍇ�A�J�ڂ�����
	if (!e) var e = window.event;
	if(e.keyCode == 13){
		move(inputAreaNum);
		return false;
	}
	//�G���^�[�L�[�ȊO��������Ă����ꍇ�́A�ڑ��\�������A���^�C������
	changeTextAreaColor2(textArea);	
}

//���͏��𐮗����Ď���ʂɑJ��
//���̓G���[�̓`�F�b�N����
//���͂��ꂽ�p�����[�^�����̂܂ܑ���
function move(inputAreaNum){
	var nextUrl = "";	
	//���͏����擾
	var siteswap1 = removeSpace( document.siteswapForm.siteswap1.value );
	var check1 = inputCheck(siteswap1);
	if(inputAreaNum >= 2){
		var siteswap2 = removeSpace( document.siteswapForm.siteswap2.value );
		var check2 = inputCheck(siteswap2);
	}
	if(inputAreaNum >= 3){
		var trans = removeSpace( document.siteswapForm.trans.value );
		var checkt = inputCheck(trans);
	}	
	
	//�ڑ��Ȃ��̂Ƃ�
	if(inputAreaNum == 1){
		//���̓G���[���������ꍇ�͑J�ڂ��Ȃ��Ń��b�Z�[�W�\��
		if(check1 == -1){
			dispMessage("���̓G���[");
			return;
		}
		//*�����������ꍇ�͑J�ڂ��Ȃ��Ń��b�Z�[�W�\��
		if(check1 == -4){
			dispMessage("*���������܂�");
			return;
		}
		if(check1 == 2){					//�A�X�^���X�N�t
			nextUrl = "analyzeSS.html?siteswap1=" + siteswap1 + "&n=" + document.siteswapForm.ballNum.selectedIndex;
		}else if(check1 == -3){
			nextUrl = "analyzeSS.html";
		}else{		
			nextUrl = "analyzeSS.html?siteswap1=" + siteswap1;
		}
	}
	//���ڐڑ��̂Ƃ�
	else if(inputAreaNum == 2){
		//���̓G���[���������ꍇ�͑J�ڂ��Ȃ��Ń��b�Z�[�W�\��
		if(check1 == -1 || check2 == -1){
			dispMessage("���̓G���[");
			return;
		}
		nextUrl = "analyzeSS.html?siteswap1=" + siteswap1 + "&siteswap2=" + siteswap2;	
	}
	//�Ђ��ڑ��̂Ƃ�	
	else if(inputAreaNum == 3){
		//���̓G���[���������ꍇ�͑J�ڂ��Ȃ��Ń��b�Z�[�W�\��
		if(check1 == -1 || checkt == -1 || check2 == -1){
			dispMessage("���̓G���[");
			return;
		}else if(checkt==-5){
			dispMessage("*���������܂�");
			return;		
		}
		nextUrl = "analyzeSS.html?siteswap1=" + siteswap1 + "&trans=" + trans + "&siteswap2=" + siteswap2;
	}
	window.open(nextUrl,'_self');
}

//�^����ꂽ��������o�����ĕ\��
function viewCharArray(input){
	var i;
	var string = "";
	for (i = 0; i < input.length; i++) {
		string += (input.charAt(i) + ",");	
	}
	alert(string);
}

//�^����ꂽ�����z����o�����ĕ\��
function viewIntArray(input){
	var i;
	var string = "";
	for (i = 0; i < input.length; i++) {
		string += (input[i] + ",");	
	}
	alert(string);
}

//�^����ꂽ2�����z��(2�~width)��\��
function view2Array(input){
	var i;
	var string1 = string2 = "";

	for(i=0;i<width;i++){
		string1 += (input[0][i] + ",");
		string2 += (input[1][i] + ",");
	}
	alert( string1 + "\n" + string2);
}

//�s���S�T�C�g�X���b�v�̃W���O�����O�\���𔻒�
function juggleCheck2(intSS){
	var i,l = intSS.length;
	var tmpSS = new Array(l);
	for(i=0; i<l; i++) tmpSS[i]=0;
	for(i=0; i<l; i++) if(intSS[i]>=0) tmpSS[(i+intSS[i])%l]++;
	for(i=0; i<l; i++) if(tmpSS[i]>=2) return(false);
	return(true);
}

//�{�[���̌���Ԃ�
function ballNum(intSS){
	var i,n = 0;
	for(i=0;i<intSS.length;i++) n += intSS[i];
	n /= intSS.length;
	return n;
}

//�T�C�g�X���b�v(int)���O��(int)�ɕϊ�
function calcIntOrbit(intSS){
	var intOrbit = new Array(2);		//�O��(int,2�����z��)
	intOrbit[0] = new Array(width);
	intOrbit[1] = new Array(width);

	var i,j=0,tmp=0;
	for(i=0;i<width;i++){
		intOrbit[tmp][i] = intSS[j];
		intOrbit[1-tmp][i] = -1;
		j = (j+1)%intSS.length;
		tmp = 1-tmp;
	}
	return(intOrbit);
}

//�ڑ��\��2�̃T�C�g�X���b�v(int)���O��(int)�ɕϊ�
function calcIntOrbit2(intSS1,intSS2){
	var intOrbit = new Array(2);		//�O��(int,2�����z��)
	intOrbit[0] = new Array(width);
	intOrbit[1] = new Array(width);

	var l1 = intSS1.length;
	var l2 = intSS2.length;
	var L1 = Math.floor(width/2/l1)*l1; if( Math.abs(L1-width/2) > Math.abs(L1+l1-width/2) )L1+=l1;
    var L2 = width - L1;
	if(L1 == 0){L1 += l1; L2 -= l1;}		//������(�O�����\������邱�Ƃ�D�悳����)
	var i,j=0,tmp=0;
	for(i=0;i<L1;i++){
		intOrbit[tmp][i] = intSS1[j];
		intOrbit[1-tmp][i] = -1;
		j = (j+1)%intSS1.length;
		tmp = 1-tmp;
	}
	j=0;
	for(;i<width;i++){
		intOrbit[tmp][i] = intSS2[j];
		intOrbit[1-tmp][i] = -1;
		j = (j+1)%intSS2.length;
		tmp = 1-tmp;
	}
	return(intOrbit);
}

//�ڑ��\��3�̃T�C�g�X���b�v(int)���O��(int)�ɕϊ�
function calcIntOrbit3(intSS1,intTrans,intSS2){
	var intOrbit = new Array(2);		//�O��(int,2�����z��)
	intOrbit[0] = new Array(width);
	intOrbit[1] = new Array(width);

	var l1 = intSS1.length;
	var l2 = intSS2.length;
	var lt = intTrans.length;
	
	//�O�����v�Z
	var L1,L2;
	if(l1+lt+l2>=width){ L1=l1,L2=l2; }		//�\�����Ɏ��܂�Ȃ��ꍇ���l��
	else{
		var width2 = width - lt;		//�̂蕔�����������\����
		L1 = Math.floor(width2/2/l1)*l1; if( Math.abs(L1-width2/2) > Math.abs(L1+l1-width2/2) )L1+=l1;
	    L2 = width2 - L1;
		if(L1 == 0){L1 += l1; L2 -= l1;}		//������(�O�����\������邱�Ƃ�D�悳����)    
	}
	var i,j=0,tmp=0;
	for(i=0;i<L1;i++){						//�O����
		intOrbit[tmp][i] = intSS1[j];
		intOrbit[1-tmp][i] = -1;
		j = (j+1)%intSS1.length;
		tmp = 1-tmp;
	}
	j=0;
	for(;i<L1+lt;i++){						//�ڑ���
		intOrbit[tmp][i] = intTrans[j];
		intOrbit[1-tmp][i] = -1;
		j++;
		tmp = 1-tmp;	
	}
	j=0;
	for(;i<width;i++){						//�㔼��
		intOrbit[tmp][i] = intSS2[j];
		intOrbit[1-tmp][i] = -1;
		j = (j+1)%intSS2.length;
		tmp = 1-tmp;
	}
	return(intOrbit);
}

//�O��(int)���O��(������)�ɕϊ�
function calcCharOrbit(intOrbit){
	var charOrbit = new Array(2);		//�O��(char,2�����z��)
	charOrbit[0] = new Array(width);
	charOrbit[1] = new Array(width);
	var i;
	for(i=0;i<width;i++){
		if(intOrbit[0][i]<0) charOrbit[0][i] = "�@";
		else charOrbit[0][i] = ch[ intOrbit[0][i] ];
		if(intOrbit[1][i]<0) charOrbit[1][i] = "�@";
		else charOrbit[1][i] = ch[ intOrbit[1][i] ];	
	}
	return(charOrbit);
}

//1�̃{�[�������i�[����N���X
var Ball = function(ballId){
	this.ballId = ballId;			//�R���X�g���N�^(�{�[��ID:0�`35)
	this.fileName = (ballId<10) ? 	//�\���p�摜��
					"image/ball" + "0" + ballId + ".png" : 
					"image/ball" + ballId + ".png" ;
	this.toString = function(){	
		alert( this.ballId + "," + this.fileName );
	}
}

//������(�W���O�����O�\)���O��(�{�[��)�ɕϊ�
function calcBallOrbit(intOrbit,ballNum){
	var ballOrbit = new Array(2);		//�O��(Ball,2�����z��)
	var l;
	ballOrbit[0] = new Array(width);
	ballOrbit[1] = new Array(width);
	
	//�O����������
	var i,j=0;
	for(i=0;i<width;i++) ballOrbit[0][i]=null;
	for(i=0;i<width;i++) ballOrbit[1][i]=null;
	
	var tmp=0;
	for(i=0;i<ballNum;i++){
		for(j=0;j<width;j++){
			tmp = 0;
			if(intOrbit[tmp][j]>0 && ballOrbit[tmp][j]==null) break;
			tmp = 1;
			if(intOrbit[tmp][j]>0 && ballOrbit[tmp][j]==null) break;
		}
		
		while(j<width){		
			ballOrbit[tmp][j] = new Ball(i);
			l = intOrbit[tmp][j];
			if(intOrbit[tmp][j]%2 == 1) tmp = 1-tmp;
			j+=l;
		}
	}
	return ballOrbit;
}

//�\�����R���{�{�b�N�X���I�����ꂽ�Ƃ��̏���
function setWidth(){
	//�I�����ꂽ�l��Cookie�ɕۑ�
	selectedWidthIdx = document.siteswapForm.width.selectedIndex;
	setCookie("widthIdx",selectedWidthIdx);

	//�������Z�b�g
	width = widthData[selectedWidthIdx];

	var widthFlag = false;		//�\�����ύX�t���O
	var intOrbit;				//�O��(int)
	var charOrbit;				//�O��(����)
	var ballOrbit;				//�O��(�{�[��)

	//�ڑ��Ȃ��̉��
	if( SSdata["p"]==1 ){
		//�W���O�����O�\���𔻒�
		var intSS = toEval(SSdata["siteswap1"]);
		if( juggleCheck(intSS) ){
			//�O�����Čv�Z
			var ballNum = calcBallNum(intSS);	//�{�[����
			intOrbit = calcIntOrbit(intSS);		//�O��(int)
			widthFlag = true;					//�t���O�Z�b�g
		}
	}
	//���ڐڑ�
	else if(SSdata["p"]==3){
		//�ڑ��\���𔻒�
		var intSS1 = toEval(SSdata["siteswap1"]);
		var intSS2 = toEval(SSdata["siteswap2"]);	
		if( transCheck2(intSS1,intSS2) ){
			//�O�����Čv�Z
			var ballNum = calcBallNum(intSS1);			//�{�[����
			intOrbit = calcIntOrbit2(intSS1,intSS2);	//�O��(int)
			widthFlag = true;							//�t���O�Z�b�g
		}
	}
	//�Еt���ڑ�
	else if(SSdata["p"]==4){
		//�ڑ��\���𔻒�
		var intSS1 = toEval(SSdata["siteswap1"]);
		var intTrans = toEval(SSdata["trans"]);
		var intSS2 = toEval(SSdata["siteswap2"]);
		if( transCheck3(intSS1,intTrans,intSS2) ){
			//�O�����Čv�Z
			var ballNum = calcBallNum(intSS1);					//�{�[����
			intOrbit = calcIntOrbit3(intSS1,intTrans,intSS2);	//�O��(int)
			widthFlag = true;									//�t���O�Z�b�g
		}
	}	
	//�O�������ɕ\������Ă����ꍇ�͍ĕ`��
	if(widthFlag){
		charOrbit = calcCharOrbit(intOrbit);			//�O��(����)
		ballOrbit = calcBallOrbit(intOrbit,ballNum);	//�O��(�{�[��)
		//�N�����ĕ\��
		document.getElementById("orbitArea").innerHTML
			= charOrbitString(charOrbit) 				//�O��(������)��\��
			+ ballOrbitString(ballOrbit);   			//�O��(�{�[��)��\��
	}
}

//�����I��p�R���{�{�b�N�X�\��
function dispWidthComboBox(){

	//�N�b�L�[����C���f�b�N�X�����o��
	widthIdx = CookieRead("widthIdx");
	if(widthIdx == "" || widthIdx == null){				//�N�b�L�[�Ƀf�[�^���Ȃ������ꍇ
		widthIdx = 4;
	}else{
		widthIdx = Math.floor(widthIdx);
		if(widthIdx<0 || widthIdx>7)	widthIdx = 4;	//�N�b�L�[�ɕs���ȃf�[�^���������ꍇ
	}

	//�R���{�{�b�N�X�\��
	//�؂�ւ����������Ƃ��ɁA�I������Ă��鉡�������N�b�L�[�ɕۑ�
	document.write("<select name=width onChange='setWidth()'>");
	var i;
	for(i=0;i<widthData.length;i++){
		document.write("<option value='" + widthData[i] + "'");
		if(widthIdx == i) document.write(" selected");
		document.write(">" + widthData[i] +"</option>");
	}
	document.write("</select>");	
}

//�����͈͎w��R���{�{�b�N�X���ύX���ꂽ�Ƃ��̏���
//���������N�b�L�[�ɕۑ��A�����_���A�j���[�V�����ւ̃����N���X�V
function setHeightIdx(){
	//�ۑ�
	var selectedHeightIdx1 = document.siteswapForm.height1.selectedIndex;
	var selectedHeightIdx2 = document.siteswapForm.height2.selectedIndex;
	setCookie("heightIdx1",selectedHeightIdx1);
	setCookie("heightIdx2",selectedHeightIdx2);
	
	//���ϐ��ɂ��i�[
	var h1 = eval(selectedHeightIdx1), h2 = eval(selectedHeightIdx2);
	if(h1>h2){
		Hmax = h1;
		Hmin = h2;
	}else{
		Hmax = h2;
		Hmin = h1;
	}
	//�����_���A�j���[�V�����ւ̃����N���X�V
	setRandomAnimationLink();
	//�����_���{�^���̎g�p��/�s���X�V
	setRandomSSButtonState();
}

//�����͈͎w��R���{�{�b�N�X�\��
function dispHeightComboBox(){
	//�\���p�f�[�^
	var heightData = new Array(36);	
	var i;
	for(i=0; i<=35; i++) heightData[i] = i + "";

	//�N�b�L�[����C���f�b�N�X�����o��
	var heightIdx1 = CookieRead("heightIdx1");
	var heightIdx2 = CookieRead("heightIdx2");	
	if(heightIdx1 == "" || heightIdx1 == null){				//�N�b�L�[�Ƀf�[�^���Ȃ������ꍇ
		heightIdx1 = 0;
	}else{
		heightIdx1 = Math.floor(heightIdx1);
		if(heightIdx1<0 || heightIdx1>35)	heightIdx1 = 0;	//�N�b�L�[�ɕs���ȃf�[�^���������ꍇ
	}
	if(heightIdx2 == "" || heightIdx2 == null){				//�N�b�L�[�Ƀf�[�^���Ȃ������ꍇ
		heightIdx2 = 9;
	}else{
		heightIdx2 = Math.floor(heightIdx2);
		if(heightIdx2<0 || heightIdx2>35)	heightIdx2 = 9;	//�N�b�L�[�ɕs���ȃf�[�^���������ꍇ
	}	
	
	//���ϐ��ɂ��i�[
	if(heightIdx1>heightIdx2){
		Hmax = heightIdx1;
		Hmin = heightIdx2;
	}else{
		Hmax = heightIdx2;
		Hmin = heightIdx1;
	}

	//�R���{�{�b�N�X�\��
	document.write("<select name=height1 onChange='setHeightIdx()'>");
	for(i=0;i<heightData.length;i++){
		document.write("<option value='" + heightData[i] + "'");
		if(heightIdx1 == i) document.write(" selected");
		document.write(">" + heightData[i] +"</option>");
	}
	document.write("</select>");
	document.write("<font size=2> �` </font>");
	document.write("<select name=height2 onChange='setHeightIdx()'>");
		for(i=0;i<heightData.length;i++){
		document.write("<option value='" + heightData[i] + "'");
		if(heightIdx2 == i) document.write(" selected");
		document.write(">" + heightData[i] +"</option>");
	}
	document.write("</select>");	
}

//�{�[�����w��R���{�{�b�N�X���ύX���ꂽ�Ƃ��̏���
//�{�[�������N�b�L�[�ɕۑ��A�����_���A�j���[�V�����ւ̃����N���X�V
function setBallNumIdx(){
	//�ۑ�
	var selectedBallNumIdx = document.siteswapForm.ballNum.selectedIndex; 
	setCookie("ballNumIdx",selectedBallNumIdx);
	//�����_���A�j���[�V�����ւ̃����N���X�V
	setRandomAnimationLink();
	//�����_���{�^���̎g�p��/�s���X�V
	setRandomSSButtonState();
}

//�{�[�����w��R���{�{�b�N�X�\��
function dispBallNumComboBox(){
	//�\���p�f�[�^
	ballNumData = new Array(36);
	var i;
	for(i=0; i<=35; i++) ballNumData[i] = i + "";

	var n;
	new getHikisuu();
	var nTmp = getHikisuu.data.n;									//URL����{�[���������o��
	if(nTmp == "" || nTmp == null) nTmp = CookieRead("ballNumIdx");	//URL�Ƀf�[�^���Ȃ������ꍇ�̓N�b�L�[������o��

	//������xnull�`�F�b�N
	if(nTmp == "" || nTmp == null){		//�f�[�^���Ȃ������ꍇ
		n = 3;
	}else{
		n = Math.floor(nTmp);
		if(n<0 || n>35)	n = 3;			//�N�b�L�[�ɕs���ȃf�[�^���������ꍇ
	}
	
	//���̎��_�ňꉞ�N�b�L�[�ɂ��ۑ�
	setCookie("ballNumIdx",n);	

	//�R���{�{�b�N�X�\��
	document.write("<select name=ballNum onChange='setBallNumIdx()'>");
	for(i=0;i<ballNumData.length;i++){
		document.write("<option value='" + ballNumData[i] + "'");
		if(n == i) document.write(" selected");
		document.write(">" + ballNumData[i] +"</option>");
	}
	document.write("</select>");
}

//�A�j���[�V�����p�ʃE�B���h�E�`�F�b�N�{�b�N�X���N���b�N���ꂽ�Ƃ��̏���
function changeOtherWindowState(obj){
	//�A�j���[�V�����p�ʃE�B���h�E�\���t���O���`�F�b�N�{�b�N�X����擾
	otherWindowFlag = obj.checked;

	//�N�b�L�[�ɃZ�b�g
	if(otherWindowFlag) setCookie("otherWindow",1);
	else setCookie("otherWindow",0);

	//�\�����ɂ͕ʃE�B���h�E��\���A��\�����ɂ͕ʃE�B���h�E�����
	if(otherWindowFlag){
		dispAnimationInOtherWindow();
	}else{
		closeOtherWindow();
	}
}

//�A�j���[�V������ʃE�B���h�E�ŕ\������`�F�b�N�{�b�N�X
function dispOtherWindowCheckBox(){
	//�N�b�L�[����\���t���O���擾
	var tmpOtherWin = CookieRead("otherWindow");
	if(tmpOtherWin =="1") otherWindowFlag = true;
	else otherWindowFlag = false;

	//�`�F�b�N�{�b�N�X�\��
	document.write("<input type='checkbox' name='otherWindow' value='' ");
	document.write("onClick='changeOtherWindowState(this)' ");
	if(otherWindowFlag) document.write('checked');
	document.write('>');
}

//�T�C�g�X���b�v�̋O��(������)��\������html��Ԃ�
function charOrbitString(charOrbit){
	var i,str="";
	//��ʃT�C�Y�ɉe������Ȃ��悤�ɕ\�T�C�Y���Œ�	
	str += ("<table border=1 cellspacing=0 width=" + (width*31+5) + ">");
		str += ("<tr>");
			for(i=0;i<width;i++){
				str += ("<td class=w>" + charOrbit[0][i] + "</td>");
			}
		str += ("</tr>");
	  	str += ("<tr>");
			for(i=0;i<width;i++){
				str += ("<td class=w>" + charOrbit[1][i] + "</td>");
			}
		str += ("</tr>");
	str += ("</table>");
	return(str);
}

//�T�C�g�X���b�v�̋O��(�{�[��)��\������html��Ԃ�
function ballOrbitString(ballOrbit){
	var i,str="";
	nullImage = "image/null.png";
	//��ʃT�C�Y�ɉe������Ȃ��悤�ɕ\�T�C�Y���Œ�
	str += ("<table border=1 cellspacing=0 width=" + (width*31+5) + ">");
		str += ("<tr>");
			for(i=0;i<width;i++){
				if(ballOrbit[0][i]==null)
					str += ("<td class=w><img src= " + nullImage + "></td>");
				else 
					str += ("<td class=w><img src= " + ballOrbit[0][i].fileName + "></td>");
			}
		str += ("</tr>");
		str += ("<tr>");
			for(i=0;i<width;i++){
				if(ballOrbit[1][i]==null)
					str += ("<td class=w><img src= " + nullImage + "></td>");
				else 
					str += ("<td class=w><img src= " + ballOrbit[1][i].fileName + "></td>");
			}
		str += ("</tr>");
	str += ("</table>");

	return(str);
}

//td�^�O�t�ŕ������\��
function td(str){
	document.write("<td>" + str + "</td>");	
}

//td�^�O�t+�F���ŕ������\��

function td_c(str,color){
	document.write("<td bgcolor=" + color + ">" + str + "</td>");	
}

//p�^�O�t�ŕ������\��
function p(str){
	document.write("<p>" + str + "</p>");	
}

//��ԕ�����({0,1,2}�Ƃ�)�𐶐�
function makeCharState(ballNum,state){
	var b = calcBinary(state);
	var i,charState = "{",count=0,returnPoint = 40;
	//�{�[����20�����Ȃ���s�����Ȃ�
	if(ballNum>=20) returnPoint = Math.floor(ballNum/2);
	//�����񐶐�
	for(i=0;i<b.length;i++){
		if(b[i]==1){
			charState += i;
			count++;									//�����J�E���g
			if(i!=b.length-1) charState += ",";			//��؂�̃J���}������(�Ō�͏���)
			if(count==returnPoint) charState += "<br>";	//�����܂ł�������s������
		}
	}
	charState += "}";
	return(charState);
}

//�T�C�g�X���b�v����\��
function dispInfo(ballNum,intSS,state){
	//��ԕ�����({0,1,2}�Ƃ�)�𐶐�
	var charState = makeCharState(ballNum,state);
	document.write("<table class=b border=1>");
		document.write("<tr bgcolor=#d5eaff>");
			document.write("<td width=28>��</td>");
			document.write("<td width=28>����</td>");
			document.write("<td width=56>����</td>");
			td("��Ԑ�");
			td("���");
		document.write("</tr>");
		document.write("<tr bgcolor=#ffffd5>");
			td(ballNum);
			td(intSS.length);
			td(strState(state));
			td(state);
			td(charState);
		document.write("</tr>");
	document.write("</table>");
}

//2�̃T�C�g�X���b�v�̏����󂯎��A�\�ɂ��ĕ\��
function dispInfo2(charSS1,charSS2){
	var intSS1 = toEval(charSS1);
	var intSS2 = toEval(charSS2);	
	var jugglable1 = juggleCheck(intSS1);
	var jugglable2 = juggleCheck(intSS2);

	//��{�X�e�[�^�X�v�Z	
	if(jugglable1){
		var ballNum1 = calcBallNum(intSS1);
		var state1 = calcState(intSS1);
		var charState1 = makeCharState(ballNum1,state1);
	}
	if(jugglable2){
		//��{�X�e�[�^�X�v�Z
		var ballNum2 = calcBallNum(intSS2);
		var state2 = calcState(intSS2);	
		var charState2 = makeCharState(ballNum2,state2);
	}

	document.write("<table class=b border=1>");

	document.write("<tr bgcolor=#d5eaff>");
		document.write("<td bgcolor=white border=0></td>");
		td("�W���O�����O");
		td("��");
		td("����");
		td("����");
		td("��Ԑ�");
		td("���");
	document.write("</tr>");
	
	document.write("<tr bgcolor=#ffffd5>");
		if(jugglable1){
			document.write("<td>"); a_intSS(intSS1); document.write("</td>");
			td("��");
			td(ballNum1);
			td(intSS1.length);
			td(strState(state1));
			td(state1);
			td(charState1);
		}
		else{
			td(charSS1);
			td("�~");
			td("-");
			td("-");
			td("-");
			td("-");
			td("-");			
		}
	document.write("</tr>");

	document.write("<tr bgcolor=#ffffd5>");
		if(jugglable2){
			document.write("<td>"); a_intSS(intSS2); document.write("</td>");
			td("��");
			td(ballNum2);
			td(intSS2.length);
			td(strState(state2));
			td(state2);
			td(charState2);
		}
		else{
			td(charSS2);
			td("�~");
			td("-");
			td("-");
			td("-");
			td("-");
			td("-");
		}
	document.write("</tr>");

	document.write("</table>");
};


//�֘A�T�C�g�X���b�v��\��
function dispRelatedSSInfo(revSS,showerSS,z01SS,resolSS,grandSS,plus1SS,minus1SS){
	var nextUrl,a,i;
	document.write("<table class=b border=1>");

	document.write("<tr bgcolor=#ffd5ea>");
		document.write("<td colspan='2'>�֘A�T�C�g�X���b�v</td>");
	document.write("</tr>");

	document.write("<tr>");
		document.write("<td bgcolor=#d5eaff width=70>���o�[�X</td>");
		nextUrl = "analyzeSS.html?siteswap1=" + revSS;
		a = a_s(nextUrl,revSS);
		td_c(a,"#ffffd5");
	document.write("</tr>");

	document.write("<tr>");
		document.write("<td bgcolor=#d5eaff width=70>�V�����[��</td>");
		if(showerSS!=""){
			nextUrl = "analyzeSS.html?siteswap1=" + showerSS;
			a = a_s(nextUrl,showerSS);
		}else{
			a = "�s��";
		}
		td_c(a,"#ffffd5");
	document.write("</tr>");

	document.write("<tr>");
		document.write("<td bgcolor=#d5eaff width=70>Z01�ϊ�</td>");
		if(z01SS!=""){
			nextUrl = "analyzeSS.html?siteswap1=" + z01SS;
			a = a_s(nextUrl,z01SS);
		}else{
			a = "�s��";
		}
		td_c(a,"#ffffd5");
	document.write("</tr>");

	document.write("<tr>");
		document.write("<td bgcolor=#d5eaff width=70>�O������</td>");
		a="";
		for(i=0;i<resolSS.length;i++){		//�S�O����\��
			nextUrl = "analyzeSS.html?siteswap1=" + resolSS[i];
			a += a_s(nextUrl,resolSS[i]);
			a += " ";
		}
		td_c(a,"#ffffd5");
	document.write("</tr>");

	document.write("<tr>");
		document.write("<td bgcolor=#d5eaff width=70>��ꉻ</td>");
		a="";
		if(grandSS.length>0){
			for(i=0;i<grandSS.length;i++){		//�S�O����\��		
				nextUrl = "analyzeSS.html?siteswap1=" + grandSS[i];
				a += a_s(nextUrl,grandSS[i]);
				a += " ";
			}
		}else{
			a = "�s��";
		}
		td_c(a,"#ffffd5");
	document.write("</tr>");
	
	document.write("<tr>");
		document.write("<td bgcolor=#d5eaff width=70>�{�[��+1</td>");
		a="";
		if(plus1SS.length>0){
			for(i=0;i<plus1SS.length;i++){		//�S+1SS��\��		
				nextUrl = "analyzeSS.html?siteswap1=" + plus1SS[i];
				a += a_s(nextUrl,plus1SS[i]);
				a += " ";
			}
		}else{
			a = "�s��";
		}
		td_c(a,"#ffffd5");
	document.write("</tr>");	
	
	document.write("<tr>");
		document.write("<td bgcolor=#d5eaff width=70>�{�[��-1</td>");
		a="";
		if(minus1SS.length>0){
			for(i=0;i<minus1SS.length;i++){		//�S-1SS��\��		
				nextUrl = "analyzeSS.html?siteswap1=" + minus1SS[i];
				a += a_s(nextUrl,minus1SS[i]);
				a += " ";
			}
		}else{
			a = "�s��";
		}
		td_c(a,"#ffffd5");
	document.write("</tr>");
}

//2���Ƃ���ΐ���Ԃ�
function log2(a){
  var r;
  r=Math.log(a)/Math.log(2.0);
  return(r);
}

//��Ԃ�Ԃ�(a=2^n-1�Ȃ�����)
function strState(a){
	var n;
	a++;
	n = Math.floor(log2(a));
	if(Math.pow(2,n)==a) return("�����");
	if(Math.pow(2,n+1)==a) return("�����");
	return("��N���");
}

//��Ԃ�Ԃ�(���:1,��N:0)
function calcStateNum(intSS){
	var state = calcState(intSS);
	var n;
	state++;
	n = Math.floor(log2(state));
	if(Math.pow(2,n)==state) return(1);
	if(Math.pow(2,n+1)==state) return(1);
	return(0);	
}

//str1��n�����ڂ�str2�Œu��
function replaceString(str1,str2,n){

	before = str1.substring(0,n);
	after = str1.substring(n+1);
	return(before + str2 + after);
}


//���o�[�X�T�C�g�X���b�v(������)��Ԃ�
function calcRevSS(intSS,charSS){
	var i,j,l=intSS.length;	
	var revSSArray = new Array(l);	
	//�Ђ�����Ԃ����������߂�
	for(i=0; i<l; i++){
		j=l-1-(i+intSS[i])%l;
		revSSArray[j] = charSS.charAt(i); 
	}

	var revSS = "";
	for(j=0;j<l;j++){			//������Ƃ��ĘA��
		revSS += revSSArray[j];
	}
	return(revSS);
}

//�V�����[���T�C�g�X���b�v(������)��Ԃ�
function calcShowerSS(intSS){
	var i,l = intSS.length;
	//�s�Ȃ�""��Ԃ�
	for(i=0;i<l;i++) if(intSS[i]==0 || intSS[i]>18) return("");
	var showerSS = "";
	for(i=0;i<l;i++){
		showerSS += ch[intSS[i]*2-1];
		showerSS += "1";
	}
	return(showerSS);
}

//�O�������T�C�g�X���b�v(������z��)��Ԃ�
function calcResolSS(intSS,charSS){
	var copyIntSS = copyArray(intSS);	//�J�ڌ��ɉe����^���Ȃ��悤�ɃR�s�[
	var resolSS = new Array();
	var i,l = copyIntSS.length;

	//0���܂܂�Ă����番��s��
	for(i=0;i<l;i++){
		if(copyIntSS[i]==0){
			resolSS[0] = charSS;
			return(resolSS);			//���������ɂ��̂܂ܕԂ�
		}
	}
	//�O���������{
	var tmp,j=0,k;				//j�Ԗڂ̋O�����L�^
	var intTmpSS = new Array(l);
	for(i=0;i<l;i++){
		if(copyIntSS[i]!=0){		
			for(k=0;k<l;k++) intTmpSS[k]=0;		//�O�������Z�b�g
			tmp=i;
			while(tmp<l){
				intTmpSS[tmp]=copyIntSS[tmp];
				tmp+=copyIntSS[tmp];
			}
			tmp=tmp%l;
			if(tmp==i) {
				resolSS[j] = toChar(intTmpSS);
				j++;
				for(k=0;k<l;k++) copyIntSS[k] -= intTmpSS[k];
			}		
		}
	}
	//�c�肪�S��0�łȂ���΋O���ɒǉ�
	var check = false;
	for(i=0;i<l;i++) if(copyIntSS[i]!=0){check=true; break;}
	if(check) resolSS[j] = toChar(copyIntSS);

	return(resolSS);
}

//�T�C�g�X���b�v�����[�v�����Ċ���Ԃ̂��̂̈ꗗ��Ԃ�
function calcGrandSS(intSS){
	var grandSS = new Array();
	var shiftSS = copyArray(intSS);
	var i=0;
	while(1){	
		if(calcStateNum(shiftSS) == 1){	//����Ԃ�����
			grandSS[i] = toChar(shiftSS);
			i++;
		}
		shiftSS = calcShiftSS(shiftSS);				//1���ɃV�t�g
		if(compareArray(intSS,shiftSS)) break;		//�ŏ��ɖ߂�����I��
	}
	return(grandSS);
}

//�{�[����1�����p�^�[��(������)�����
//�@�����𑫂� �A�S����1�𑫂�
function calcPlus1SS(intSS){
	var l = intSS.length;		//����
	var plus1SS = new Array();
	var i,j=0,tmpSS;
	//�@�����𑫂�
	for(i=0;i<l;i++){
		tmpSS = copyArray(intSS);
		tmpSS[i]+=l;
		//���(35)�𒴂��Ă��Ȃ�������̗p
		if(tmpSS[i]<=35){
			plus1SS[j] = toChar( copyArray(tmpSS) );
			j++;
		}
	}
	//�A�S����1�𑫂�(�ő�l������𒴂��Ă��Ȃ��Ƃ��̂�)	
	//����1�̂Ƃ����@�Əd������̂ŏ��O
	if( calcSSMax(intSS)<=34 && l!=1){
		tmpSS = copyArray(intSS);
		for(i=0;i<l;i++) tmpSS[i]+=1;
		plus1SS[j] = toChar( copyArray(tmpSS) );
	}
	
	return(plus1SS);
}

//�{�[����1���Ȃ��p�^�[��(������)�����
//�@���������� �A�S������1������
function calcMinus1SS(intSS){
	var l = intSS.length;		//����
	var minus1SS = new Array();
	var i,j=0,tmpSS;
	for(i=0;i<l;i++){
		tmpSS = copyArray(intSS);
		tmpSS[i]-=l;
		//����(0)�𒴂��Ă��Ȃ�������̗p
		if(tmpSS[i]>=0){
			minus1SS[j] = toChar( copyArray(tmpSS) );
			j++;
		}
	}
	//�A�S����1�𑫂�(�ŏ��l��������������Ă��Ȃ��Ƃ��̂�)
	//����1�̂Ƃ����@�Əd������̂ŏ��O
	if( calcSSMin(intSS)>=1  && l!=1){
		tmpSS = copyArray(intSS);
		for(i=0;i<l;i++) tmpSS[i]-=1;
		minus1SS[j] = toChar( copyArray(tmpSS) );
	}
	
	return(minus1SS);
}

//�T�C�g�X���b�v��Z01�g��(������)����
function calcZ01SS(intSS){
	var l = intSS.length;		//����
	//�s�Ȃ�""��Ԃ�
	for(i=0;i<l;i++) if(intSS[i]==0 || intSS[i]>12) return("");
	var Z01SS = "";
	for(i=0;i<l;i++){
		Z01SS += ch[intSS[i]*3-1];
		Z01SS += "0";
		Z01SS += "1";
	}	
	return(Z01SS);
}

//�T�C�g�X���b�v��1���ɃV�t�g�����ĕԂ�
function calcShiftSS(intSS){
	var shiftSS = new Array();
	var i;
	for(i=0; i<intSS.length-1; i++) shiftSS[i] = intSS[i+1];
	shiftSS[i] = intSS[0];		//�擪����
	return(shiftSS);
}

//�T�C�g�X���b�v�����E��n�V�t�g�����ĕԂ�(p=-1:���V�t�g�Ap=1:�E�V�t�g)
function calcShiftSS2(intSS,n,p){
	var l = intSS.length;
	var shiftSS = new Array(l);
	var i,j,k;
	if(p==1){i=0; j=n%l;}
	else{j=0; i=n%l;}
	for(k=0; k<l; k++){
		shiftSS[j] = intSS[i];
		i = (i+1)%l;
		j = (j+1)%l;
	}
	return(shiftSS);
}

//�T�C�g�X���b�v�̎w��ʒu�̒l���擪/�����ɗ���悤�ɃV�t�g(p=-1:�擪�Ap=1:����)
//abcde,3,-1��deabc   abcde,3,1��eabcd
function calcShiftSS3(intSS,x,p){
	var shiftSS;
	if(p==1) shiftSS = calcShiftSS2(intSS,intSS.length-x-1,1);
	else shiftSS = calcShiftSS2(intSS,x,-1);
	return(shiftSS);
}

//�z��̒��g���r(��v:true,�s��v:false)
function compareArray(array1,array2){
	if(array1.length != array2.length) return(false);	//�������Ⴆ�Εs��v
	var i;
	for(i=0; i<array1.length; i++){
		if(array1[i] != array2[i]) return(false);
	}
	return(true);
}

//���(Hmax)�Ɖ���(Hmin)�𒴂��Ȃ��͈͂ŁAindex�ȍ~�̒l�����Ɋ񂹂�
function moveLeft(tmpSS,index){
	var i,l=tmpSS.length;
	
	//index�ȍ~�̒l�̍��v���v�Z(index=1 : 2,3,1,4�Ȃ�3+1+4=8)
	var sum = 0;
	for(i=index; i<l; i++) sum += tmpSS[i];

	if( sum/(l-index)<Hmin ) return(null);		//����������Ȃ��ꍇ��null��Ԃ�
	if( sum>(l-index)*Hmax ) return(null);		//����������Ȃ��ꍇ��null��Ԃ�

	//�����𕪔z
	for(i=index; i<l; i++) tmpSS[i]=Hmin;
	sum -= (l-index)*Hmin;	//�����̕�

	//����𒴂��Ȃ��͈͂�index�Ԗڂ��瑫���Ă���
	var a = Hmax - Hmin;		//i�Ԗڂɑ�����l�̍ő�l
	var b;						//���ۂɑ�����
	for(i=index; i<l; i++){		
		if(sum == 0) break;		//����ȏ㑫���Ȃ��Ȃ����炨���
		if(a>=sum) b = sum;		//sum�̕������Ȃ��̂�sum����������
		else b = a;				//����܂ő���		
		tmpSS[i] += b;
		sum -= b;
	}
	return(tmpSS);
}

//���(Hmax)�Ɖ���(Hmin)�𒴂��Ȃ��͈͂ŁAindex�ȍ~�̒l���E�Ɋ񂹂�
function moveRight(tmpSS,index){
	var i,l=tmpSS.length;

	//index�ȍ~�̒l�̍��v���v�Z(index=1 : 2,3,1,4�Ȃ�3+1+4=8)
	var sum = 0;
	for(i=index; i<l; i++) sum += tmpSS[i];

	if( sum/(l-index)<Hmin ) return(null);		//����������Ȃ��ꍇ��null��Ԃ�
	if( sum>(l-index)*Hmax ) return(null);		//����������Ȃ��ꍇ��null��Ԃ�

	//�����𕪔z
	for(i=index; i<l; i++) tmpSS[i]=Hmin;
	sum -= (l-index)*Hmin;	//�����̕�

	//����𒴂��Ȃ��͈͂Ŗ������瑫���Ă���
	var a = Hmax - Hmin;		//i�Ԗڂɑ�����l�̍ő�l
	var b;						//���ۂɑ�����
	for(i=l-1; i>=index; i--){
		if(sum == 0) break;		//����ȏ㑫���Ȃ��Ȃ����炨���
		if(a>=sum) b = sum;		//sum�̕������Ȃ��̂�sum����������
		else b = a;				//����܂ő���		
		tmpSS[i] += b;
		sum -= b;
	}
	return(tmpSS);
}

//���͐���������̗�ɕϊ�(4012��4003��3400)
//�ϊ��s�Ȃ�null��Ԃ�
function nextStep(tmpSS){
	var i;
	//����1or0�Ȃ�ϊ��s��
	if(tmpSS.length<=1) return(null);
	//�E���琔��������
	for(i=tmpSS.length-2; i>=0; i--){
		//�ړ��\(����������and����������)���𔻒�
		if(tmpSS[i]-1>=Hmin && tmpSS[i+1]+1<=Hmax){		
			//�ړ����s
			tmpSS[i]-=1;
			tmpSS[i+1]+=1;
			tmpSS = moveLeft(tmpSS,i+1);
			return(tmpSS);
		}
	}
	//�ړ����������Ȃ������ꍇ�͕ϊ��s��
	return(null);
}

//���͐���������̗�ɕϊ�(3400��4003��4012)
//�ϊ��s�Ȃ�null��Ԃ�
function prevStep(tmpSS){
	var i;
	//����1or0�Ȃ�ϊ��s��
	if(tmpSS.length<=1) return(null);	
	//�E���琔��������
	for(i=tmpSS.length-1; i>=1; i--){
		//�ړ��\(����������and����������)���𔻒�
		if(tmpSS[i]-1>=Hmin && tmpSS[i-1]+1<=Hmax){
			//�ړ����s
			tmpSS[i]-=1;
			tmpSS[i-1]+=1;
			tmpSS = moveRight(tmpSS,i);
			return(tmpSS);
		}
	}
}

//tmpSS�X�^�[�g�Œ��H���T�C�g�X���b�v���v�Z���ĉ�ʕ\��
//z=1�������Az=2���~��(�\���͏�ɏ���)
function dispBlankSS(intSS,tmpSS,p,ballNum,z){
	var i,count =0;
	if(z==1){				//����
		while(1){
			if(tmpSS == null || count == BlankMax) break;
			//�ꎞ�z����u�����N�����ɓ��Ă͂߂�
			for(i=0; i<p.length; i++) intSS[p[i]] = tmpSS[i];
			//�W���O�����O�\�Ȃ�\��
			if(juggleCheck(intSS)){
				a_intSS(intSS);
				document.write(" ");
				count++;
			}			
			tmpSS = nextStep(tmpSS);
		}
	}else{					//�~��
		var stackSS = new Array();
		while(1){
			if(tmpSS == null || count == BlankMax) break;
			//�ꎞ�z����u�����N�����ɓ��Ă͂߂�
			for(i=0; i<p.length; i++) intSS[p[i]] = tmpSS[i];
			//�W���O�����O�\�Ȃ�ۑ�
			if(juggleCheck(intSS)){
				stackSS[count] = Array.apply(null,intSS);
				count++;
			}
			tmpSS = prevStep(tmpSS);			
		}
		//��U�ۑ������T�C�g�X���b�v��������\��	
		for(i=count-1;i>=0;i--){
			a_intSS(stackSS[i]);
			document.write(" ");
		}
	}
	if(count==0) document.write("�Ȃ�");
		
	//tmpSS���W���O�����O�\�ɂȂ�܂ő���(�����Ȃ��̂Ƀ����N���\�������̂�h�~)
	while(1){
		if(tmpSS==null) break;
		for(i=0; i<p.length; i++) intSS[p[i]] = tmpSS[i];
		if(juggleCheck(intSS)) break;
		if(z==1) tmpSS = nextStep(tmpSS);
		else tmpSS = prevStep(tmpSS);
	}
	return(tmpSS);		//�\���������̂̎���tmpSS��Ԃ�(null�̏ꍇ������)
}

//tmpSS�X�^�[�g�Œ��H���Ђ��v�Z���ĉ�ʕ\��
//z=1�������Az=2���~��(�\���͏�ɏ���)
function dispBlankTrans(state1,state2,charSS1,intTrans,charSS2,tmpSS,p,ballNum,transSum,z){
	var i,count =0;
	if(z==1){				//����
		while(1){
			if(tmpSS == null || count == BlankMax2) break;
			//�ꎞ�z����u�����N�����ɓ��Ă͂߂�
			for(i=0; i<p.length; i++) intTrans[p[i]] = tmpSS[i];
			//�W���O�����O�\�Ȃ�\��
			if(transCheck(state1,intTrans,state2)){
				a_charSS1_intTrans_charSS2(charSS1,intTrans,charSS2);
				document.write(" ");
				count++;
			}			
			tmpSS = nextStep(tmpSS);
		}
	}else{					//�~��
		var stackSS = new Array();
		while(1){
			if(tmpSS == null || count == BlankMax2) break;
			//�ꎞ�z����u�����N�����ɓ��Ă͂߂�
			for(i=0; i<p.length; i++) intTrans[p[i]] = tmpSS[i];
			//�W���O�����O�\�Ȃ�ۑ�
			if(transCheck(state1,intTrans,state2)){
				stackSS[count] = Array.apply(null,intTrans);
				count++;
			}
			tmpSS = prevStep(tmpSS);			
		}
		//��U�ۑ������T�C�g�X���b�v��������\��	
		for(i=count-1;i>=0;i--){
			a_charSS1_intTrans_charSS2(charSS1,stackSS[i],charSS2);
			document.write(" ");
		}
	}
	if(count==0) document.write("�Ȃ�");
		
	//tmpSS���W���O�����O�\�ɂȂ�܂ő���(�����Ȃ��̂Ƀ����N���\�������̂�h�~)
	while(1){
		if(tmpSS==null) break;
		for(i=0; i<p.length; i++) intTrans[p[i]] = tmpSS[i];
		if(transCheck(state1,intTrans,state2)) break;
		if(z==1) tmpSS = nextStep(tmpSS);
		else tmpSS = prevStep(tmpSS);
	}
	return(tmpSS);		//�\���������̂̎���tmpSS��Ԃ�(null�̏ꍇ������)
}

//���H���Ђ��T�C�g�X���b�v��\��
function dispTransWithBlank(charSS1,charTrans,charSS2){
	var intSS1 = toEval(charSS1);
	var intTrans = toEval(charTrans);
	var intSS2 = toEval(charSS2);
	lt = charTrans.length;
	var i,j,sum,astaNum;
	var p = new Array();
	
	//�T�C�g�X���b�v�\��
	document.write("<h3 style='display:inline;'>" + charSS1 + "-" + charTrans + "-" + charSS2 + "</h3>");
	document.write("<br><br>");
	
	//��{���\��,��{���v�Z
	dispInfo2(charSS1,charSS2);
	var state1 = calcState(intSS1);
	var state2 = calcState(intSS2);
	var ballNum1 = calcBallNum(intSS1);
	var ballNum2 = calcBallNum(intSS2);
	var jugglable1 = juggleCheck(intSS1);
	var jugglable2 = juggleCheck(intSS2);

	//�Е����̍��v�����߂�
	var transSum = calcTransSum(state1,lt,state2);

	//�ڑ��s���m�肵�Ă���Ƃ��͌v�Z���ȗ����ďI��
	//�O��̃T�C�g�X���b�v���W���O�����O�s���A�{�[�������Ⴆ�ΐڑ��͕K���s��	
	if(ballNum1 != ballNum2 || !jugglable1 || !jugglable2 || transSum == -1){
		document.write("<br>");	
		document.write("<table class=b border=1><tr>");
		td_c("�K���T�C�g�X���b�v�ꗗ","#d5eaff");
		document.write("</tr><tr bgcolor=#ffffd5><td>�Ȃ�</td></tr></table>");
		return;
	}

	//�{�[�������Z�b�g
	var ballNum = calcBallNum(intSS1);

	//'*'�̐��ƁA'*'�ȊO�̐����̍��v���J�E���g
	sum = astaNum = j = 0;
	for(i=0;i<lt;i++){
		if(intTrans[i]==-1) {		//*�̈ʒu��p�Ƃ��ċL�^
			astaNum++;
			p[j]=i;
			j++;
		}
		else sum+=intTrans[i];
	}
	
	//URL����ꎞ�z������o��
	//t�p�����[�^�́A1�����ڂ������t���A2�����ڈȍ~���ꎞ�z��𕶎��񉻂�������
	//z=1:�����Az=2�F�t���Az=3�Flast�����N����(������z=2�ɂȂ�)
	var z,tFlag = false;
	new getHikisuu();
	var t = getHikisuu.data.t;
	if(t != null){		//���̓`�F�b�N
		var reg = RegExp("^[1-3][0-9a-zA-Z]+$");
		if (t.match(reg)) {
			z = eval(t.charAt(0));
			var tmpUrlSS = toEval(t.substring(1));
			//�������`�F�b�N
			j=0;
			for(i=0;i<tmpUrlSS.length;i++) j+=tmpUrlSS[i];
			if(tmpUrlSS.length == astaNum && j==transSum-sum) tFlag = true;
		}
	}

	//�v�Z�p�̈ꎞ�z���p��	
	var tmpSS = new Array(astaNum);
	if(tFlag){			//URL����̈ꎞ�z��擾�ɐ��������Ƃ�
		tmpSS = Array.apply(null,tmpUrlSS);
		//"last"�����N��������Ă����ꍇ�́A�E�Ɋ񂹂�
		if(z==3){
			tmpSS = moveRight(tmpSS,0);
			z=2;
		}
	}else{				//URL����̎擾���Ȃ������Ƃ��͏����A�ŏ�����
		tmpSS[0] = transSum - sum;				//*�����̍��v���L�^
		for(i=1; i<tmpSS.length; i++) tmpSS[i]=0;
		//�����ݒ�
		tmpSS = moveLeft(tmpSS,0);
		z = 1;
	}

	//�ꎞ�z��̏����l(��1�O)���Ƃ��Ă���
	if(z==1){
		tmpPrevSS = Array.apply(null,tmpSS);
		tmpPrevSS = prevStep(tmpPrevSS);
	}else{
		tmpNextSS = Array.apply(null,tmpSS);
		tmpNextSS = nextStep(tmpNextSS);	
	}

	//�e�[�u���\���J�n
	document.write("<br>");	
	document.write("<table class=b border=1>");
	document.write("<tr>");
	td_c("�K���T�C�g�X���b�v�ꗗ","#d5eaff");	
	document.write("</tr>");	

	document.write("<tr bgcolor=#ffffd5>");	
	document.write("<td>");

	//�ꎞ�z��̍ŏI�l(��1�O)���Ƃ��Ă���
	if(z==1){
		tmpNextSS = dispBlankTrans(state1,state2,charSS1,intTrans,charSS2,tmpSS,p,ballNum,transSum,z);
	}else{
		tmpPrevSS = dispBlankTrans(state1,state2,charSS1,intTrans,charSS2,tmpSS,p,ballNum,transSum,z);
	}
	document.write("</td>");
	document.write("</tr>");
	
	//prev,next�����N����
	if(tmpPrevSS!=null || tmpNextSS!=null){
		document.write("<tr bgcolor=#dcdcdc>");

		document.write("<td align=center>");
		if(tmpPrevSS!=null){
			//�擪�ɖ߂郊���N
			var tmpTopSS = Array.apply(null,tmpPrevSS);
			var tmpTopCharSS = "1" + toChar(moveLeft(tmpTopSS,0));
			var topLink = 'analyzeSS.html?'
						 + 'siteswap1=' + charSS1 + '&'
						 + 'trans=' + charTrans + '&'
						 + 'siteswap2=' + charSS2;
			a(topLink,"����top");			
			blank(10);
			//1�߂郊���N
			var tmpPrevCharSS = "2" + toChar(tmpPrevSS);
			var prevLink = 'analyzeSS.html?'
						 + 'siteswap1=' + charSS1 + '&'
						 + 'trans=' + charTrans + '&'
						 + 'siteswap2=' + charSS2 + '&'
						 + 't=' + tmpPrevCharSS;
			a(prevLink,"��prev");
		}else{
			blank(32);
		}
		blank(2);
		if(tmpNextSS!=null){
			//1�i�ރ����N
			var tmpNextCharSS = "1" + toChar(tmpNextSS);
			var nextLink = 'analyzeSS.html?'
						 + 'siteswap1=' + charSS1 + '&'
						 + 'trans=' + charTrans + '&'
						 + 'siteswap2=' + charSS2 + '&'
						 + 't=' + tmpNextCharSS;
			a(nextLink,"next��");
			blank(10);			
			//�����܂Ői�ރ����N
			var tmpLastSS = Array.apply(null,tmpNextSS);
			var tmpLastCharSS = "3" + toChar(moveRight(tmpLastSS,0));
			var topLink = 'analyzeSS.html?'
						 + 'siteswap1=' + charSS1 + '&'
						 + 'trans=' + charTrans + '&'
						 + 'siteswap2=' + charSS2 + '&'
						 + 't=' + tmpLastCharSS;
			a(topLink,"last����");			
		}else{
			blank(32);
		}
		document.write("</td>");
		document.write("</tr>");
	}
	document.write("</table>");
}

//�u�����N���[�h�t�T�C�g�X���b�v���v�Z
function dispSSWithBlank(charSS,ballNum){
	var intSS = toEval(charSS);
	var i,j,sum,astaNum, l = intSS.length;
	var p = new Array();
	var tmpPrevSS = new Array();
	var tmpNextSS = new Array();

	//�T�C�g�X���b�v�\��
	document.write("<h3 style='display:inline;'>" + charSS + "&nbsp;&nbsp;&nbsp;&nbsp;" + ballNum + "�{�[��</h3>");
	blank(3);
	//�{�[����+1,-1�ւ̃����N
	var nextUrlP1 = "analyzeSS.html?siteswap1=" + charSS + "&n=" + (ballNum+1);
	var nextUrlM1 = "analyzeSS.html?siteswap1=" + charSS + "&n=" + (ballNum-1);
	document.write("<font size=2>");
		if(ballNum<35) a(nextUrlP1,"�{�[��+1"); else document.write("�{�[��+1");
		blank(3);
		if(ballNum>0)  a(nextUrlM1,"�{�[��-1"); else document.write("�{�[��-1");
	document.write("</font>");
	document.write("<br><br>");
	//�W���O�����O�s���m�肵�Ă���Ƃ��͌v�Z���ȗ����ďI��
	if(!juggleCheck2(intSS)){
		document.write("<table class=b border=1><tr>");
		td_c("�K���T�C�g�X���b�v�ꗗ","#d5eaff");
		document.write("</tr><tr bgcolor=#ffffd5><td>�Ȃ�</td></tr></table>");
		return;
	}

	//'*'�̐��ƁA'*'�ȊO�̐����̍��v���J�E���g
	sum = astaNum = j = 0;
	for(i=0;i<l;i++){
		if(intSS[i]==-1) {		//*�̈ʒu��p�Ƃ��ċL�^
			astaNum++;
			p[j]=i;
			j++;
		}
		else sum+=intSS[i];
	}
	//URL����ꎞ�z������o��
	//t�p�����[�^�́A1�����ڂ������t���A2�����ڈȍ~���ꎞ�z��𕶎��񉻂�������
	//z=1:�����Az=2�F�t���Az=3�Flast�����N����(������z=2�ɂȂ�)
	var z,tFlag = false;
	new getHikisuu();
	var t = getHikisuu.data.t;
	if(t != null){		//���̓`�F�b�N
		var reg = RegExp("^[1-3][0-9a-zA-Z]+$");
		if (t.match(reg)) {
			z = eval(t.charAt(0));
			var tmpUrlSS = toEval(t.substring(1));
			//�������`�F�b�N
			j=0;
			for(i=0;i<tmpUrlSS.length;i++) j+=tmpUrlSS[i];
			if(tmpUrlSS.length == astaNum && j==ballNum*intSS.length-sum) tFlag = true;
		}
	}
	//�v�Z�p�̈ꎞ�z���p��	
	var tmpSS = new Array(astaNum);
	if(tFlag){			//URL����̈ꎞ�z��擾�ɐ��������Ƃ�	
		tmpSS = Array.apply(null,tmpUrlSS);
		//"last"�����N��������Ă����ꍇ�́A�E�Ɋ񂹂�
		if(z==3){
			tmpSS = moveRight(tmpSS,0);
			z=2;
		}
	}else{				//URL����̎擾���Ȃ������Ƃ��͏����A�ŏ�����
		tmpSS[0] = l*ballNum - sum;				//*�����̍��v���L�^		
		for(i=1; i<tmpSS.length; i++) tmpSS[i]=0;		
		//�����ݒ�
		tmpSS = moveLeft(tmpSS,0);		
		z = 1;
	}
	//�ꎞ�z��̏����l(��1�O)���Ƃ��Ă���
	if(tmpSS==null){
		tmpPrevSS = null;
		tmpNextSS = null;
	}else{
		if(z==1){
			tmpPrevSS = Array.apply(null,tmpSS);
			tmpPrevSS = prevStep(tmpPrevSS);
		}else{
			tmpNextSS = Array.apply(null,tmpSS);
			tmpNextSS = nextStep(tmpNextSS);	
		}
	}
	
	//�e�[�u���\���J�n
	document.write("<table class=b border=1>");
	document.write("<tr>");
	td_c("�K���T�C�g�X���b�v�ꗗ","#d5eaff");	

	document.write("</tr>");	

	document.write("<tr bgcolor=#ffffd5>");	
	document.write("<td>");
	//�ꎞ�z��̍ŏI�l(��1�O)���Ƃ��Ă���
	if(z==1){
		tmpNextSS = dispBlankSS(intSS,tmpSS,p,ballNum,z);
	}else{
		tmpPrevSS = dispBlankSS(intSS,tmpSS,p,ballNum,z);
	}
	document.write("</td>");
	document.write("</tr>");
	//prev,next�����N����
	if(tmpPrevSS!=null || tmpNextSS!=null){
		document.write("<tr bgcolor=#dcdcdc>");

		document.write("<td align=center>");
		if(tmpPrevSS!=null){
			//�擪�ɖ߂郊���N
			var tmpTopSS = Array.apply(null,tmpPrevSS);
			var tmpTopCharSS = "1" + toChar(moveLeft(tmpTopSS,0));
			var topLink = 'analyzeSS.html?'
						 + 'siteswap1=' + charSS + '&'
						 + 'n=' + ballNum;
			a(topLink,"����top");			
			blank(10);
			//1�߂郊���N
			var tmpPrevCharSS = "2" + toChar(tmpPrevSS);
			var prevLink = 'analyzeSS.html?'
						 + 'siteswap1=' + charSS + '&'
						 + 'n=' + ballNum + '&'
						 + 't=' + tmpPrevCharSS;			
			a(prevLink,"��prev");
		}else{
			blank(32);
		}
		blank(2);
		if(tmpNextSS!=null){
			//1�i�ރ����N
			var tmpNextCharSS = "1" + toChar(tmpNextSS);
			var nextLink = 'analyzeSS.html?'
						 + 'siteswap1=' + charSS + '&'
						 + 'n=' + ballNum + '&'
						 + 't=' + tmpNextCharSS;			
			a(nextLink,"next��");
			blank(10);			
			//�����܂Ői�ރ����N
			var tmpLastSS = Array.apply(null,tmpNextSS);
			var tmpLastCharSS = "3" + toChar(moveRight(tmpLastSS,0));
			var topLink = 'analyzeSS.html?'
						 + 'siteswap1=' + charSS + '&'
						 + 'n=' + ballNum + '&'
						 + 't=' + tmpLastCharSS;			
			a(topLink,"last����");			
		}else{
			blank(32);
		}
		document.write("</td>");
		document.write("</tr>");
	}
	document.write("</table>");
}

//�O��̃T�C�g�X���b�v��A���v�Z
function dispDualSS(charSS1,charSS2){
	//---------��{�X�e�[�^�X��̓t�F�[�Y---------
	var intSS1 = toEval(charSS1);
	var intSS2 = toEval(charSS2);	
	var jugglable1 = juggleCheck(intSS1);
	var jugglable2 = juggleCheck(intSS2);

	//----------------�v�Z�t�F�[�Y----------------
	if(jugglable1){
		//��{�X�e�[�^�X�v�Z
		var ballNum1 = calcBallNum(intSS1);
		var state1 = calcState(intSS1);
	}
	if(jugglable2){
		//��{�X�e�[�^�X�v�Z
		var ballNum2 = calcBallNum(intSS2);		
		var state2 = calcState(intSS2);	
	}
	if(jugglable1 && jugglable2 && state1==state2){
		var ballNum = ballNum1;		//�ڑ��\�Ȃ̂Ń{�[���̌���1��2�œ�����
		//�O�����v�Z
		var intOrbit = calcIntOrbit2(intSS1,intSS2);
		var charOrbit = calcCharOrbit(intOrbit)
		var ballOrbit = calcBallOrbit(intOrbit,ballNum);
	}
	//----------------�\���t�F�[�Y----------------
	//�T�C�g�X���b�v�\��
	document.write("<h3 style='display:inline;'>" + charSS1 + "-" + charSS2 + "</h3>");
	
	//�ڑ��\�ȂƂ�
	if(jugglable1 && jugglable2 && state1==state2){
		blank(3);
		//�A�j���[�V�����\���y�[�W�ւ̃����N
		a_juggle2(charSS1,charSS2);	
		document.write("<br><br>");
		
		//�N����\������G���A
		document.write('<span id="orbitArea"></span>');		
		
		//�O���\��
		document.getElementById("orbitArea").innerHTML
			= charOrbitString(charOrbit) 				//�O��(������)��\��
			+ ballOrbitString(ballOrbit);   			//�O��(�{�[��)��\��		
		
		document.write("<br>");
	}
	//�ڑ��s�\�ȂƂ�
	else{
		document.write("<p><font color=red>�ڑ��s��</font></p>");
	}
	dispInfo2(charSS1,charSS2);
}

//�O��̏�Ԑ��ƌЂ̒�������A�Ђ̍��v�����߂�
//�v�Z�s�Ȃ�-1��Ԃ�
function calcTransSum(state1,lt,state2){
	//��Ԃ�2�i���ɕϊ�,�������v�Z
	var b1 = calcBinary(state1);
	var b2 = calcBinary(state2);
	var ls1 = b1.length;
	var ls2 = b2.length;
	if(lt+ls2<ls1) {return(-1);}   //�O�̏�Ԓ�����������ƕs��
	//�O��Ԃƌ���Ԃ̏d�Ȃ�𒲂ׂ�
	var i,j=0,k;
	for(i=lt;i<ls1;i++){
	  if(b1[i]==1 && b2[j]==1) b2[j]=0;
	  else if(b1[i]==1 && b2[j]==0) return(-1);
	  j++;
	}
	//���v�lsum���v�Z
	var sum=0;
	if(ls1>lt) k=lt; else k=ls1;
	for(i=0;i<k;i++) sum+= (lt-i)*b1[i];   
	for(j=0;j<ls2;j++) if(b2[j]==1) sum+=j;  
	return(sum);
}

//��Ԑ�����A��ԕ�(2�i���ɕϊ������Ƃ��̌���)�����߂�
function calcStateLength(state){
	if(state==0) return(1);
	if(state==1) return(1);
	var stateLength = 1;
	while(state>1){
		state/=2;
		state = Math.floor(state);
		stateLength++;
	}
	return(stateLength);
}

//�A�����T�C�g�X���b�v��\��
function dispTripleSS(charSS1,charTrans,charSS2){
	var i;
	//---------��{�X�e�[�^�X��̓t�F�[�Y---------
	var intSS1 = toEval(charSS1);
	var intSS2 = toEval(charSS2);
	var intTrans = toEval(charTrans);
	var jugglable1 = juggleCheck(intSS1);
	var jugglable2 = juggleCheck(intSS2);
	var state1 = calcState(intSS1);
	var state2 = calcState(intSS2);
	var ballNum1 = calcBallNum(intSS1);
	var ballNum2 = calcBallNum(intSS2);	
	var lt = charTrans.length;

	//----------------�v�Z�t�F�[�Y----------------
	var transable = true;		//�ڑ��̉A�s������
	//�O��̃T�C�g�X���b�v���W���O�����O�s���A�{�[�������Ⴆ�ΐڑ��͕K���s��
	if(ballNum1 != ballNum2 || !jugglable1 || !jugglable2){
		transable = false;
	}else{
		transable = transCheck(state1,intTrans,state2);		//�J�ډ\���`�F�b�N
	}	
	if(transable){		//�ڑ��\�ȂƂ�
		calcIntOrbit3(intSS1,intTrans,intSS2)
		var ballNum = ballNum1;		//�ڑ��\�Ȃ̂Ń{�[���̌���1��2�œ�����
		//�O�����v�Z
		var intOrbit = calcIntOrbit3(intSS1,intTrans,intSS2);
		var charOrbit = calcCharOrbit(intOrbit)
		var ballOrbit = calcBallOrbit(intOrbit,ballNum);
	}
	//----------------�\���t�F�[�Y----------------
	//�T�C�g�X���b�v�\��
	document.write("<h3 style='display:inline;'>" + charSS1 + "-" + charTrans + "-" + charSS2 + "</h3>");
	
	//�ڑ��\�ȂƂ�
	if(transable){
		blank(3);
		//�A�j���[�V�����\���y�[�W�ւ̃����N
		a_juggle3(charSS1,charTrans,charSS2);	
		document.write("<br><br>");		

		//�O����\������G���A
		document.write('<span id="orbitArea"></span>');
		
		//�O���\��
		document.getElementById("orbitArea").innerHTML
			= charOrbitString(charOrbit) 				//�O��(������)��\��
			+ ballOrbitString(ballOrbit);   			//�O��(�{�[��)��\��		
		
		document.write("<br>");
	}
	//�ڑ��s�\�ȂƂ�
	else{
		document.write("<p><font color=red>�ڑ��s��</font></p>");
	}
	dispInfo2(charSS1,charSS2);
}

//�ʏ�̃T�C�g�X���b�v�\��
function dispNormalSS(charSS){
	var intSS = toEval(charSS);									//�������int�ɕϊ�
	var jugglable = juggleCheck(intSS);							//�W���O�����O�\���𔻒�	
	//�W���O�����O�\�ȂƂ�
	if(jugglable){
		var ballNum = calcBallNum(intSS);						//�{�[���̌��𔻒�
		var state = calcState(intSS);							//��Ԑ����v�Z

		//�O���v�Z
		var intOrbit = calcIntOrbit(intSS);				
		var charOrbit = calcCharOrbit(intOrbit);
		var ballOrbit = calcBallOrbit(intOrbit,ballNum);	
		//�T�C�g�X���b�v�\��
		document.write("<h3 style='display:inline;'>" + charSS + "</h3>");
		blank(3);
		//�A�j���[�V�����\���y�[�W�ւ̃����N
		a_juggle1(charSS);
		document.write('&nbsp');

		//�O����\������G���A
		document.write('<span id="orbitArea"></span>');
		
		//�O���\��
		document.getElementById("orbitArea").innerHTML
			= charOrbitString(charOrbit) 				//�O��(������)��\��
			+ ballOrbitString(ballOrbit);   			//�O��(�{�[��)��\��
		
		document.write("<br>");
		//�֘A�T�C�g�X���b�v�̌v�Z
		var revSS		= calcRevSS(intSS,charSS);		//���o�[�X
		var showerSS	= calcShowerSS(intSS);			//�V�����[
		var z01SS		= calcZ01SS(intSS);				//z01�ϊ�
		var resolSS		= calcResolSS(intSS,charSS);	//�O������
		var grandSS		= calcGrandSS(intSS);			//��ꉻ
		var plus1SS		= calcPlus1SS(intSS);			//1����SS
		var minus1SS	= calcMinus1SS(intSS);			//1���Ȃ�SS

		document.write("<table>");
		document.write("<tr><td>");					
			//��ԕ\��
			dispInfo(ballNum,intSS,state);
		document.write("</td></tr>");
		document.write("<tr><td>");
			//�֘A�T�C�g�X���b�v�\��
			dispRelatedSSInfo(revSS,showerSS,z01SS,resolSS,grandSS,plus1SS,minus1SS);
		document.write("</td></tr>");
		document.write("</table>");
	}else{
		//�W���O�����O�s�\�ȂƂ�
		document.write("<h3 style='display:inline;'>" + charSS + "</h3>");
		document.write("<p><font color=red>�W���O�����O�s��</font></p>");
	}	
}

//�w�肵���C�ӂ̈ʒu(x,y)��SS������(�A�s�͖��Ȃ�)
//���ɍs���l�ɂ�-,��O�ɗ���l�ɂ�+
function calcSwapSS(intSS,x,y){
	var swapSS = copyArray(intSS);
	var w = y-x;
	swapSS[x] = intSS[y] + w;
	swapSS[y] = intSS[x] - w;
	return(swapSS);
}

//�擪���瑖�����Ďw��̐���(n)������ʒu��T��
//������Ȃ����-1��Ԃ�
function searchNum(intSS,n){
	var i;
	for(i=0;i<intSS.length;i++) if(intSS[i]==n) return(i);
	return(-1);
}

//�擪���瑖�����āA�w��̐���(n)��m�Ԗڂɓo�ꂷ��ʒu��Ԃ�
//������Ȃ����-1��Ԃ�
//0,1,2,-1,-1,3,-1 ,n:-1,m:1 ��4
function searchNum2(intSS,n,m){
	var i,j;
	j=0;		//��������n�̐�
	for(i=0;i<intSS.length;i++){
		if(intSS[i]==n) j++;
		if(j==m) return(i)
	}
	return(-1);
}

//�����_����0�`n-1�܂ł��������z��(����n)���쐬����
function calcRandomBaseSS(n){
	var randomBaseSS = new Array(n);
	var i,j,k,a,r;
	
	//������(�l�������Ă��Ȃ������ɂ�-1�����Ă���)
	for(i=0;i<n;i++) randomBaseSS[i] = -1;	
	k=n;									//�l������ʒu�̌�
	for(i=0;i<n;i++){
		r = rand(k) + 1;					//�l������ʒu�������_���Ŏw��
		r = searchNum2(randomBaseSS,-1,r);	//r�Ԗڂɓo�ꂷ��-1�̈ʒu���v�Z
		randomBaseSS[r] = i;
		k--;
	}
	return(randomBaseSS);
}

//�ŏ��l���ő�l�̈ʒu��Ԃ�(p=-1:�ŏ��Ap=1:�ő�)
function calcMinOrMaxPos(intSS,p){
	var i,x=0,m = intSS[0];
	if(p==1){		//�ő匟��
		for(i=0; i<intSS.length; i++){
			if(intSS[i]>m){m=intSS[i]; x=i;}
		}
	}
	else{			//�ŏ�����
		for(i=0; i<intSS.length; i++){
			if(intSS[i]<m){m=intSS[i]; x=i;}
		}
	}
	return(x);
}

//�����_���ȃT�C�g�X���b�v���v�Z����
//l:�����AballNum:�{�[�����Amax:��������Amin:��������
function calcRandomSS(l,ballNum,max,min){
	var i,j,r;
	var randomSS = new Array(l);

	//�ő�l�A�ŏ��l���{�[���̌��ƈ�v���Ă�����A�\��SS�͊�{�Z�̂�
	if(max==ballNum || min==ballNum){
		for(i=0;i<l;i++) randomSS[i] = ballNum;
		return(randomSS);
	}
	//�{�[���̐���max,min�̊ԂɂȂ���΁ASS�����s��(null��Ԃ�)
	if(min>ballNum || max<ballNum) return(null);

	var p,pos,flag1;	
	while(1){
		randomSS = calcRandomBaseSS(l);			//0�`l-1�܂ł̒l���Z�b�g	
		for(i=0;i<l;i++) randomSS[i] -= i;		//0�`l-1�܂ň���
		
		//�����_���Ȉʒu�ɁA�������{�[���̐�����������
		for(i=0;i<ballNum;i++) randomSS[rand(l)] += l;
		
		//100�񎎍s���ă_����������0�����蒼��
		for(i=0;i<100;i++){
			flag1 = 0;
			for(j=0;j<l;j++){
				if(randomSS[j]>max){flag1=1;  pos=j; break;}	//����𒴂��鐔������
				if(randomSS[j]<min){flag1=-1; pos=j; break;}	//����������鐔������
			}
			//max,min�̊ԂɎ��܂��Ă����ꍇ�͍��i
			if(flag1 == 0) return(randomSS);

			//�����͈͂��͂ݏo���Ă����ꍇ,�͂ݏo����������[�Ɋ񂹂�
			//��������F�擪�ցA�������F������
			randomSS = calcShiftSS3(randomSS,pos,-flag1);

			//�͂ݏo���������A�ŏ�/�ő�̕����ƌ���
			if(flag1==1){	//�������
				p = calcMinOrMaxPos(randomSS,-1);	//�ŏ��l�̈ʒu�𔻕�
				randomSS = calcSwapSS(randomSS,p,0);
			}
			else{			//������
				p = calcMinOrMaxPos(randomSS,1);	//�ő�l�̈ʒu�𔻕�
				randomSS = calcSwapSS(randomSS,p,l-1);
			}
		}
	}
	return(randomSS);	//�s�v
}

//�����_���ȃT�C�g�X���b�v�𐶐����A�ڍ׉�ʂɑJ�ڂ���
function moveRandomSS(inputAreaNum){
	var ballNum = document.siteswapForm.ballNum.selectedIndex;	//�����Z���N�g�{�b�N�X����擾
	var l = rand(9) + 1;										//������1�`10
	var randomIntSS = calcRandomSS(l,ballNum,Hmax,Hmin);		//�����_��SS�v�Z

	//�����_��SS�����s�Ȃ�A�G���[���b�Z�[�W��\������
	if(randomIntSS == null){
		dispMessage("�����_���T�C�g�X���b�v�����G���[");
		return;
	}
	var randomCharSS = toChar(randomIntSS);
	var nextUrl = "analyzeSS.html?siteswap1=" + randomCharSS;

	//���܂łƓ������̓��͗����o�����߂̏���
	if(inputAreaNum==2) nextUrl += "&siteswap2=";
	if(inputAreaNum==3) nextUrl += "&trans=&siteswap2=";

	window.open(nextUrl,'_self');
}

//�ʃE�B���h�E�ŃA�j���[�V������\��������(�ʃE�B���h�E�t���O�������Ă����ꍇ�̂�)
function dispAnimationInOtherWindow(){
	//�A�j���[�V�����\���t���O�𔻒�
	if(otherWindowFlag){
		//�A�j���[�V�����y�[�W��URL�𐶐�(��̓����N�̓I�t)
		var animationURL = makeAnimationURL(false);

		//�ʃE�B���h�E�\��(�X�V)
		//�T�C�Y�ݒ肪�s����͍̂ŏ���1��̂݁B�܂��A�T�C�Y�ݒ���ȗ������
		//�����I�ɕʃ^�u�ŊJ�����ꍇ������̂ŁA�ݒ�K�{�B
		otherWindow = window.open(animationURL, "animation_window", "width=440,height=420,scrollbars=yes,resizable=1");
	}
}

//���ɊJ����Ă���A�j���[�V�����p�E�B���h�E�����
function closeOtherWindow(){
	otherWindow.close();
}