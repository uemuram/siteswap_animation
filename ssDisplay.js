//入力欄の数に応じて、現在の入力内容を大域に記憶する
function saveInputArea(inputAreaNum){
	if(inputAreaNum >= 1) presentInputSS1 = document.siteswapForm.siteswap1.value;
	if(inputAreaNum >= 2) presentInputSS2 = document.siteswapForm.siteswap2.value;
	if(inputAreaNum >= 3) presentInputTrans = document.siteswapForm.trans.value;
}

//入力欄の数に応じて、記憶されている入力内容を表示する
function loadInputArea(inputAreaNum){
	document.siteswapForm.siteswap1.value = presentInputSS1;
	if(inputAreaNum >= 2) document.siteswapForm.siteswap2.value = presentInputSS2;
	if(inputAreaNum >= 3) document.siteswapForm.trans.value = presentInputTrans;	
}

//ボタン文字列(juggle)を返す
function juggleButton(){
	return('<input type="button" value="juggle" onclick="move(inputAreaNum)">');
}

//ボタン文字列(random)を返す
function randomButton(){
	return('<input type="button" name="randomButton" value="random" onclick="moveRandomSS(inputAreaNum)" style="width:55px">');
}

//入力エリアを1つ+ボタンを表示
function Disp1InputArea(inputAreaNum){
	//使用しないリンクを無効化、使用するリンクを有効化
	document.getElementById("offlink1").removeAttribute("href");
	document.getElementById("offlink2").setAttribute("href","javascript:void(0);");
	document.getElementById("offlink3").setAttribute("href","javascript:void(0);");
	document.getElementById("swaplink").removeAttribute("href");
	saveInputArea(inputAreaNum);	//現在の表示状態を保存
	document.getElementById("inputTextArea").innerHTML = 
	  '<input class=x type="text" size="28" name="siteswap1" onKeyUp="return keyTouch(event,inputAreaNum,this);">'
	+ '&nbsp;'
	+ juggleButton()
	+ randomButton();
	loadInputArea(1);				//次の表示状態を設定
	changeTextAreaColor(document.siteswapForm.siteswap1);	//ジャグリング可能な場合の背景色変更
	return(1);
}

//入力エリアを2つ+ボタンを表示
function Disp2InputArea(inputAreaNum){
	//使用しないリンクを無効化、使用するリンクを有効化
	document.getElementById("offlink1").setAttribute("href","javascript:void(0);");
	document.getElementById("offlink2").removeAttribute("href");
	document.getElementById("offlink3").setAttribute("href","javascript:void(0);");	
	document.getElementById("swaplink").setAttribute("href","javascript:void(0);");
	saveInputArea(inputAreaNum);	//現在の表示状態を保存
	document.getElementById("inputTextArea").innerHTML = 
	  '<input  class=x type="text" size="16" name="siteswap1" onKeyUp="return keyTouch(event,inputAreaNum,this);">'
	+ '&nbsp;-&nbsp;'
	+ '<input  class=x type="text" size="16" name="siteswap2" onKeyUp="return keyTouch(event,inputAreaNum,this);">'
	+ '&nbsp;'	
	+ juggleButton()
	+ randomButton();
	loadInputArea(2);				//次の表示状態を設定
	changeTextAreaColor(document.siteswapForm.siteswap1);	//ジャグリング可能な場合の背景色変更
	changeTextAreaColor(document.siteswapForm.siteswap2);
	return(2);
}

//入力エリアを3つ+ボタンを表示
function Disp3InputArea(inputAreaNum){
	//使用しないリンクを無効化、使用するリンクを有効化
	document.getElementById("offlink1").setAttribute("href","javascript:void(0);");
	document.getElementById("offlink2").setAttribute("href","javascript:void(0);");	
	document.getElementById("offlink3").removeAttribute("href");
	document.getElementById("swaplink").setAttribute("href","javascript:void(0);");
	saveInputArea(inputAreaNum);	//現在の表示状態を保存
	document.getElementById("inputTextArea").innerHTML = 
	  '<input class=x type="text" size="16" name="siteswap1" onKeyUp="return keyTouch(event,inputAreaNum,this);">'
	+ '&nbsp;-&nbsp;'
	+ '<input class=x type="text" size="16" name="trans" onKeyUp="return keyTouch2(event,inputAreaNum,this);">'
	+ '&nbsp;-&nbsp;'
	+ '<input class=x type="text" size="16" name="siteswap2" onKeyUp="return keyTouch(event,inputAreaNum,this);">'
	+ '&nbsp;'	
	+ juggleButton()
	+ randomButton();
	loadInputArea(3);				//次の表示状態を設定
	changeTextAreaColor(document.siteswapForm.siteswap1);	//ジャグリング可能な場合の背景色変更
	changeTextAreaColor2(document.siteswapForm.trans);
	changeTextAreaColor(document.siteswapForm.siteswap2);	
	return(3);
}

//入力エリアの中身、背景色をクリア
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

//入力エリアの前後を交換
function SwapInputArea(inputAreaNum){
	//処理は入力欄が2つ以上あるときにのみ行う
	if(inputAreaNum >= 2){
		var tmp = document.siteswapForm.siteswap2.value;
		document.siteswapForm.siteswap2.value = document.siteswapForm.siteswap1.value;
		document.siteswapForm.siteswap1.value = tmp;
		//ジャグリング可能性を判定して背景色変更
		changeTextAreaColor(document.siteswapForm.siteswap1);
		changeTextAreaColor(document.siteswapForm.siteswap2);
	}
	//入力欄が3つあるときは、接続可能性の判定も行う
	if(inputAreaNum >= 3){
		changeTextAreaColor2(document.siteswapForm.trans);
	}
}

//ランダムアニメーション内のリンクを設定
function setRandomAnimationLink(){
	//ボール個数をセレクトボックスから取得
	var ballNum = document.siteswapForm.ballNum.selectedIndex;	

	//ランダムアニメーションが可能かを判定
	var randomable = false;
	if(Hmax>=ballNum) randomable = true;

	//リンク先URL設定
	var nextUrl = "juggle.html?mode=r"
				+ "&n=" + ballNum
				+ "&m=" + Hmax;
	//リンクURL文字列設定(不可能だった場合は'不可'追加)
	var nextUrlString = 'ランダムアニメーション'
	if(!randomable) nextUrlString += '不可';
	nextUrlString +=(
						'['  + ballNum + 'ball,'
						+ 'max' + Hmax + ']'
					);
	//リンク文字列設定
	var linkString = "";
	linkString += '<font size="2"'
	if(!randomable) linkString += 'color="gray"';				//不可なら色をグレーに
	linkString += '>';
	if(randomable) linkString += '<a href=' + nextUrl + '>';	//不可なら<a>を使わない
	linkString += nextUrlString + '</font>'

	//リンク表示
	document.getElementById("randomAnimationLink").innerHTML = linkString;
}

//ランダムSSを生成可能か判定し、生成不可ならrandomボタンを押下不可にする
function setRandomSSButtonState(){
	//ボール個数をセレクトボックスから取得
	var ballNum = document.siteswapForm.ballNum.selectedIndex;
	//ランダムSSが生成可能かを判定
	var randomable = false;
	if(Hmin<=ballNum && ballNum<=Hmax) randomable = true;
	
	//ランダムSS生成可能だった場合、ボタンが使えるようにする
	document.siteswapForm.randomButton.disabled = !randomable;	
}