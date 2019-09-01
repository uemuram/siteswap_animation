//���͗��̐��ɉ����āA���݂̓��͓��e����ɋL������
function saveInputArea(inputAreaNum){
	if(inputAreaNum >= 1) presentInputSS1 = document.siteswapForm.siteswap1.value;
	if(inputAreaNum >= 2) presentInputSS2 = document.siteswapForm.siteswap2.value;
	if(inputAreaNum >= 3) presentInputTrans = document.siteswapForm.trans.value;
}

//���͗��̐��ɉ����āA�L������Ă�����͓��e��\������
function loadInputArea(inputAreaNum){
	document.siteswapForm.siteswap1.value = presentInputSS1;
	if(inputAreaNum >= 2) document.siteswapForm.siteswap2.value = presentInputSS2;
	if(inputAreaNum >= 3) document.siteswapForm.trans.value = presentInputTrans;	
}

//�{�^��������(juggle)��Ԃ�
function juggleButton(){
	return('<input type="button" value="juggle" onclick="move(inputAreaNum)">');
}

//�{�^��������(random)��Ԃ�
function randomButton(){
	return('<input type="button" name="randomButton" value="random" onclick="moveRandomSS(inputAreaNum)" style="width:55px">');
}

//���̓G���A��1��+�{�^����\��
function Disp1InputArea(inputAreaNum){
	//�g�p���Ȃ������N�𖳌����A�g�p���郊���N��L����
	document.getElementById("offlink1").removeAttribute("href");
	document.getElementById("offlink2").setAttribute("href","javascript:void(0);");
	document.getElementById("offlink3").setAttribute("href","javascript:void(0);");
	document.getElementById("swaplink").removeAttribute("href");
	saveInputArea(inputAreaNum);	//���݂̕\����Ԃ�ۑ�
	document.getElementById("inputTextArea").innerHTML = 
	  '<input class=x type="text" size="28" name="siteswap1" onKeyUp="return keyTouch(event,inputAreaNum,this);">'
	+ '&nbsp;'
	+ juggleButton()
	+ randomButton();
	loadInputArea(1);				//���̕\����Ԃ�ݒ�
	changeTextAreaColor(document.siteswapForm.siteswap1);	//�W���O�����O�\�ȏꍇ�̔w�i�F�ύX
	return(1);
}

//���̓G���A��2��+�{�^����\��
function Disp2InputArea(inputAreaNum){
	//�g�p���Ȃ������N�𖳌����A�g�p���郊���N��L����
	document.getElementById("offlink1").setAttribute("href","javascript:void(0);");
	document.getElementById("offlink2").removeAttribute("href");
	document.getElementById("offlink3").setAttribute("href","javascript:void(0);");	
	document.getElementById("swaplink").setAttribute("href","javascript:void(0);");
	saveInputArea(inputAreaNum);	//���݂̕\����Ԃ�ۑ�
	document.getElementById("inputTextArea").innerHTML = 
	  '<input  class=x type="text" size="16" name="siteswap1" onKeyUp="return keyTouch(event,inputAreaNum,this);">'
	+ '&nbsp;-&nbsp;'
	+ '<input  class=x type="text" size="16" name="siteswap2" onKeyUp="return keyTouch(event,inputAreaNum,this);">'
	+ '&nbsp;'	
	+ juggleButton()
	+ randomButton();
	loadInputArea(2);				//���̕\����Ԃ�ݒ�
	changeTextAreaColor(document.siteswapForm.siteswap1);	//�W���O�����O�\�ȏꍇ�̔w�i�F�ύX
	changeTextAreaColor(document.siteswapForm.siteswap2);
	return(2);
}

//���̓G���A��3��+�{�^����\��
function Disp3InputArea(inputAreaNum){
	//�g�p���Ȃ������N�𖳌����A�g�p���郊���N��L����
	document.getElementById("offlink1").setAttribute("href","javascript:void(0);");
	document.getElementById("offlink2").setAttribute("href","javascript:void(0);");	
	document.getElementById("offlink3").removeAttribute("href");
	document.getElementById("swaplink").setAttribute("href","javascript:void(0);");
	saveInputArea(inputAreaNum);	//���݂̕\����Ԃ�ۑ�
	document.getElementById("inputTextArea").innerHTML = 
	  '<input class=x type="text" size="16" name="siteswap1" onKeyUp="return keyTouch(event,inputAreaNum,this);">'
	+ '&nbsp;-&nbsp;'
	+ '<input class=x type="text" size="16" name="trans" onKeyUp="return keyTouch2(event,inputAreaNum,this);">'
	+ '&nbsp;-&nbsp;'
	+ '<input class=x type="text" size="16" name="siteswap2" onKeyUp="return keyTouch(event,inputAreaNum,this);">'
	+ '&nbsp;'	
	+ juggleButton()
	+ randomButton();
	loadInputArea(3);				//���̕\����Ԃ�ݒ�
	changeTextAreaColor(document.siteswapForm.siteswap1);	//�W���O�����O�\�ȏꍇ�̔w�i�F�ύX
	changeTextAreaColor2(document.siteswapForm.trans);
	changeTextAreaColor(document.siteswapForm.siteswap2);	
	return(3);
}

//���̓G���A�̒��g�A�w�i�F���N���A
function ClearInputArea(inputAreaNum){
	document.siteswapForm.siteswap1.value = "";
	document.siteswapForm.siteswap1.style.background="";
	if(inputAreaNum >= 2){
		document.siteswapForm.siteswap2.value = "";
		document.siteswapForm.siteswap2.style.background="";
	}
	if(inputAreaNum >= 3){
		document.siteswapForm.trans.value = "";	
		document.siteswapForm.trans.style.background="";
	}
}

//���̓G���A�̑O�������
function SwapInputArea(inputAreaNum){
	//�����͓��͗���2�ȏ゠��Ƃ��ɂ̂ݍs��
	if(inputAreaNum >= 2){
		var tmp = document.siteswapForm.siteswap2.value;
		document.siteswapForm.siteswap2.value = document.siteswapForm.siteswap1.value;
		document.siteswapForm.siteswap1.value = tmp;
		//�W���O�����O�\���𔻒肵�Ĕw�i�F�ύX
		changeTextAreaColor(document.siteswapForm.siteswap1);
		changeTextAreaColor(document.siteswapForm.siteswap2);
	}
	//���͗���3����Ƃ��́A�ڑ��\���̔�����s��
	if(inputAreaNum >= 3){
		changeTextAreaColor2(document.siteswapForm.trans);
	}
}

//�����_���A�j���[�V�������̃����N��ݒ�
function setRandomAnimationLink(){
	//�{�[�������Z���N�g�{�b�N�X����擾
	var ballNum = document.siteswapForm.ballNum.selectedIndex;	

	//�����_���A�j���[�V�������\���𔻒�
	var randomable = false;
	if(Hmax>=ballNum) randomable = true;

	//�����N��URL�ݒ�
	var nextUrl = "juggle.html?mode=r"
				+ "&n=" + ballNum
				+ "&m=" + Hmax;
	//�����NURL������ݒ�(�s�\�������ꍇ��'�s��'�ǉ�)
	var nextUrlString = '�����_���A�j���[�V����'
	if(!randomable) nextUrlString += '�s��';
	nextUrlString +=(
						'['  + ballNum + 'ball,'
						+ 'max' + Hmax + ']'
					);
	//�����N������ݒ�
	var linkString = "";
	linkString += '<font size="2"'
	if(!randomable) linkString += 'color="gray"';				//�s�Ȃ�F���O���[��
	linkString += '>';
	if(randomable) linkString += '<a href=' + nextUrl + '>';	//�s�Ȃ�<a>���g��Ȃ�
	linkString += nextUrlString + '</font>'

	//�����N�\��
	document.getElementById("randomAnimationLink").innerHTML = linkString;
}

//�����_��SS�𐶐��\�����肵�A�����s�Ȃ�random�{�^���������s�ɂ���
function setRandomSSButtonState(){
	//�{�[�������Z���N�g�{�b�N�X����擾
	var ballNum = document.siteswapForm.ballNum.selectedIndex;
	//�����_��SS�������\���𔻒�
	var randomable = false;
	if(Hmin<=ballNum && ballNum<=Hmax) randomable = true;
	
	//�����_��SS�����\�������ꍇ�A�{�^�����g����悤�ɂ���
	document.siteswapForm.randomButton.disabled = !randomable;	
}