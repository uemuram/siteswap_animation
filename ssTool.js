//グローバル変数定義
var width = 25;						//サイトスワップ表示領域の横幅
var Hmax = 9;						//高さの上限
var Hmin = 0;						//高さの下限
var BlankMax = 250;					//虫食いサイトスワップ表示数の上限
var BlankMax2 = 100;				//虫食い糊の表示数の上限
var otherWindowFlag = false;		//他のウィンドウでアニメーションを表示するかを決定するフラグ
var otherWindow;					//アニメーション表示用の別ウィンドウ

widthData = new Array(8);		//サイトスワップ表示領域を定義
widthData[0] = "5";
widthData[1] = "10";
widthData[2] = "15";	
widthData[3] = "20";
widthData[4] = "25";
widthData[5] = "30";
widthData[6] = "35";
widthData[7] = "40";		


//cookieを表示してアラートを出す
function viewCookie(){
      alert(CookieRead("inputSwap"));
}		

//文字列の前後のスペース(全角、半角)を取り除く
function removeSpace(input){
	var i;
	//先頭からスペースを除外
	for(i=0;i<input.length;i++){
		if(input.charAt(i)!=" " && input.charAt(i)!="　") break;
	}
	input = input.substring(i,input.length);
	//末尾からスペースを除外
	for(i=input.length-1;i>=0;i--){
		if(input.charAt(i)!=" " && input.charAt(i)!="　") break;
	}
	input = input.substring(0,i+1);
	return(input);
}

//受け取ったテキストエリア内のジャグリング可能性を判定して、
//可能であればエリア内の背景色を変える。不可であれば背景色を白にする
function changeTextAreaColor(textArea){
	//通常入力(特殊文字なし)でない場合
	if(inputCheck(textArea.value)!=1){
		textArea.style.background="";
		return;
	}
	var intSS = toEval(textArea.value);
	//ジャグリング不可の場合
	if(!juggleCheck(intSS)){
		textArea.style.background="";
		return;
	}
	//ジャグリング可能だった場合は色を変える
	textArea.style.background="#FFECEC";
}

//受け取ったテキストエリア内(接続部分)と、前後のSSの接続可能性を判定して、
//可能であればエリア内の背景色を変える。不可であれば背景色を白にする
function changeTextAreaColor2(textArea){
	//通常入力(特殊文字なし)でない場合
	if(inputCheck(textArea.value)!=1						||		//接続
	   inputCheck(document.siteswapForm.siteswap1.value)!=1	||		//前半
	   inputCheck(document.siteswapForm.siteswap2.value)!=1)		//後半
	{
		textArea.style.background="";
		return;
	}		
	var intSS1 = toEval(document.siteswapForm.siteswap1.value);
	var intTrans = toEval(textArea.value);
	var intSS2 = toEval(document.siteswapForm.siteswap2.value);
	//接続不可の場合
	if(!transCheck3(intSS1,intTrans,intSS2)){
		textArea.style.background="";
		return;
	}
	//接続可能だった場合は色を変える
	textArea.style.background="#ECFFFB";
}

//テキストエリア内でキーが押された場合の処理(前後SSのリアルタイム判定)
function keyTouch(e,inputAreaNum,textArea){
	//エンターキーが押されていた場合、遷移させる
	if (!e) var e = window.event;
	if(e.keyCode == 13){
		move(inputAreaNum);
		return false;
	}
	//エンターキー以外が押されていた場合は、ジャグリング可能性をリアルタイム判定
	changeTextAreaColor(textArea);
	//入力欄が3つあった場合は接続判定も行う
	if(inputAreaNum>=3){
		changeTextAreaColor2(document.siteswapForm.trans);
	}
}

//テキストエリア内でキーが押された場合の処理2(接続のリアルタイム判定)
function keyTouch2(e,inputAreaNum,textArea){
	//エンターキーが押されていた場合、遷移させる
	if (!e) var e = window.event;
	if(e.keyCode == 13){
		move(inputAreaNum);
		return false;
	}
	//エンターキー以外が押されていた場合は、接続可能性をリアルタイム判定
	changeTextAreaColor2(textArea);	
}

//入力情報を整理して次画面に遷移
//入力エラーはチェックする
//入力されたパラメータをそのまま送る
function move(inputAreaNum){
	var nextUrl = "";	
	//入力情報を取得
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
	
	//接続なしのとき
	if(inputAreaNum == 1){
		//入力エラーがあった場合は遷移しないでメッセージ表示
		if(check1 == -1){
			dispMessage("入力エラー");
			return;
		}
		//*が多すぎた場合は遷移しないでメッセージ表示
		if(check1 == -4){
			dispMessage("*が多すぎます");
			return;
		}
		if(check1 == 2){					//アスタリスク付
			nextUrl = "analyzeSS.html?siteswap1=" + siteswap1 + "&n=" + document.siteswapForm.ballNum.selectedIndex;
		}else if(check1 == -3){
			nextUrl = "analyzeSS.html";
		}else{		
			nextUrl = "analyzeSS.html?siteswap1=" + siteswap1;
		}
	}
	//直接接続のとき
	else if(inputAreaNum == 2){
		//入力エラーがあった場合は遷移しないでメッセージ表示
		if(check1 == -1 || check2 == -1){
			dispMessage("入力エラー");
			return;
		}
		nextUrl = "analyzeSS.html?siteswap1=" + siteswap1 + "&siteswap2=" + siteswap2;	
	}
	//糊つき接続のとき	
	else if(inputAreaNum == 3){
		//入力エラーがあった場合は遷移しないでメッセージ表示
		if(check1 == -1 || checkt == -1 || check2 == -1){
			dispMessage("入力エラー");
			return;
		}else if(checkt==-5){
			dispMessage("*が多すぎます");
			return;		
		}
		nextUrl = "analyzeSS.html?siteswap1=" + siteswap1 + "&trans=" + trans + "&siteswap2=" + siteswap2;
	}
	window.open(nextUrl,'_self');
}

//与えられた文字列をバラして表示
function viewCharArray(input){
	var i;
	var string = "";
	for (i = 0; i < input.length; i++) {
		string += (input.charAt(i) + ",");	
	}
	alert(string);
}

//与えられた数字配列をバラして表示
function viewIntArray(input){
	var i;
	var string = "";
	for (i = 0; i < input.length; i++) {
		string += (input[i] + ",");	
	}
	alert(string);
}

//与えられた2次元配列(2×width)を表示
function view2Array(input){
	var i;
	var string1 = string2 = "";

	for(i=0;i<width;i++){
		string1 += (input[0][i] + ",");
		string2 += (input[1][i] + ",");
	}
	alert( string1 + "\n" + string2);
}

//不完全サイトスワップのジャグリング可能性を判定
function juggleCheck2(intSS){
	var i,l = intSS.length;
	var tmpSS = new Array(l);
	for(i=0; i<l; i++) tmpSS[i]=0;
	for(i=0; i<l; i++) if(intSS[i]>=0) tmpSS[(i+intSS[i])%l]++;
	for(i=0; i<l; i++) if(tmpSS[i]>=2) return(false);
	return(true);
}

//ボールの個数を返す
function ballNum(intSS){
	var i,n = 0;
	for(i=0;i<intSS.length;i++) n += intSS[i];
	n /= intSS.length;
	return n;
}

//サイトスワップ(int)を軌道(int)に変換
function calcIntOrbit(intSS){
	var intOrbit = new Array(2);		//軌道(int,2次元配列)
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

//接続可能な2つのサイトスワップ(int)を軌道(int)に変換
function calcIntOrbit2(intSS1,intSS2){
	var intOrbit = new Array(2);		//軌道(int,2次元配列)
	intOrbit[0] = new Array(width);
	intOrbit[1] = new Array(width);

	var l1 = intSS1.length;
	var l2 = intSS2.length;
	var L1 = Math.floor(width/2/l1)*l1; if( Math.abs(L1-width/2) > Math.abs(L1+l1-width/2) )L1+=l1;
    var L2 = width - L1;
	if(L1 == 0){L1 += l1; L2 -= l1;}		//微調整(前半が表示されることを優先させる)
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

//接続可能な3つのサイトスワップ(int)を軌道(int)に変換
function calcIntOrbit3(intSS1,intTrans,intSS2){
	var intOrbit = new Array(2);		//軌道(int,2次元配列)
	intOrbit[0] = new Array(width);
	intOrbit[1] = new Array(width);

	var l1 = intSS1.length;
	var l2 = intSS2.length;
	var lt = intTrans.length;
	
	//軌道を計算
	var L1,L2;
	if(l1+lt+l2>=width){ L1=l1,L2=l2; }		//表示幅に収まらない場合を考慮
	else{
		var width2 = width - lt;		//のり部分を除いた表示幅
		L1 = Math.floor(width2/2/l1)*l1; if( Math.abs(L1-width2/2) > Math.abs(L1+l1-width2/2) )L1+=l1;
	    L2 = width2 - L1;
		if(L1 == 0){L1 += l1; L2 -= l1;}		//微調整(前半が表示されることを優先させる)    
	}
	var i,j=0,tmp=0;
	for(i=0;i<L1;i++){						//前半部
		intOrbit[tmp][i] = intSS1[j];
		intOrbit[1-tmp][i] = -1;
		j = (j+1)%intSS1.length;
		tmp = 1-tmp;
	}
	j=0;
	for(;i<L1+lt;i++){						//接続部
		intOrbit[tmp][i] = intTrans[j];
		intOrbit[1-tmp][i] = -1;
		j++;
		tmp = 1-tmp;	
	}
	j=0;
	for(;i<width;i++){						//後半部
		intOrbit[tmp][i] = intSS2[j];
		intOrbit[1-tmp][i] = -1;
		j = (j+1)%intSS2.length;
		tmp = 1-tmp;
	}
	return(intOrbit);
}

//軌道(int)を軌道(文字列)に変換
function calcCharOrbit(intOrbit){
	var charOrbit = new Array(2);		//軌道(char,2次元配列)
	charOrbit[0] = new Array(width);
	charOrbit[1] = new Array(width);
	var i;
	for(i=0;i<width;i++){
		if(intOrbit[0][i]<0) charOrbit[0][i] = "　";
		else charOrbit[0][i] = ch[ intOrbit[0][i] ];
		if(intOrbit[1][i]<0) charOrbit[1][i] = "　";
		else charOrbit[1][i] = ch[ intOrbit[1][i] ];	
	}
	return(charOrbit);
}

//1つのボール情報を格納するクラス
var Ball = function(ballId){
	this.ballId = ballId;			//コンストラクタ(ボールID:0～35)
	this.fileName = (ballId<10) ? 	//表示用画像名
					"image/ball" + "0" + ballId + ".png" : 
					"image/ball" + ballId + ".png" ;
	this.toString = function(){	
		alert( this.ballId + "," + this.fileName );
	}
}

//数字列(ジャグリング可能)を軌道(ボール)に変換
function calcBallOrbit(intOrbit,ballNum){
	var ballOrbit = new Array(2);		//軌道(Ball,2次元配列)
	var l;
	ballOrbit[0] = new Array(width);
	ballOrbit[1] = new Array(width);
	
	//軌道を初期化
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

//表示幅コンボボックスが選択されたときの処理
function setWidth(){
	//選択された値をCookieに保存
	selectedWidthIdx = document.siteswapForm.width.selectedIndex;
	setCookie("widthIdx",selectedWidthIdx);

	//横幅をセット
	width = widthData[selectedWidthIdx];

	var widthFlag = false;		//表示幅変更フラグ
	var intOrbit;				//軌道(int)
	var charOrbit;				//軌道(文字)
	var ballOrbit;				//軌道(ボール)

	//接続なしの解析
	if( SSdata["p"]==1 ){
		//ジャグリング可能性を判定
		var intSS = toEval(SSdata["siteswap1"]);
		if( juggleCheck(intSS) ){
			//軌道を再計算
			var ballNum = calcBallNum(intSS);	//ボール個数
			intOrbit = calcIntOrbit(intSS);		//軌道(int)
			widthFlag = true;					//フラグセット
		}
	}
	//直接接続
	else if(SSdata["p"]==3){
		//接続可能性を判定
		var intSS1 = toEval(SSdata["siteswap1"]);
		var intSS2 = toEval(SSdata["siteswap2"]);	
		if( transCheck2(intSS1,intSS2) ){
			//軌道を再計算
			var ballNum = calcBallNum(intSS1);			//ボール個数
			intOrbit = calcIntOrbit2(intSS1,intSS2);	//軌道(int)
			widthFlag = true;							//フラグセット
		}
	}
	//糊付き接続
	else if(SSdata["p"]==4){
		//接続可能性を判定
		var intSS1 = toEval(SSdata["siteswap1"]);
		var intTrans = toEval(SSdata["trans"]);
		var intSS2 = toEval(SSdata["siteswap2"]);
		if( transCheck3(intSS1,intTrans,intSS2) ){
			//軌道を再計算
			var ballNum = calcBallNum(intSS1);					//ボール個数
			intOrbit = calcIntOrbit3(intSS1,intTrans,intSS2);	//軌道(int)
			widthFlag = true;									//フラグセット
		}
	}	
	//軌道が既に表示されていた場合は再描画
	if(widthFlag){
		charOrbit = calcCharOrbit(intOrbit);			//軌道(文字)
		ballOrbit = calcBallOrbit(intOrbit,ballNum);	//軌道(ボール)
		//起動を再表示
		document.getElementById("orbitArea").innerHTML
			= charOrbitString(charOrbit) 				//軌道(文字列)を表示
			+ ballOrbitString(ballOrbit);   			//軌道(ボール)を表示
	}
}

//横幅選択用コンボボックス表示
function dispWidthComboBox(){

	//クッキーからインデックスを取り出す
	widthIdx = CookieRead("widthIdx");
	if(widthIdx == "" || widthIdx == null){				//クッキーにデータがなかった場合
		widthIdx = 4;
	}else{
		widthIdx = Math.floor(widthIdx);
		if(widthIdx<0 || widthIdx>7)	widthIdx = 4;	//クッキーに不正なデータがあった場合
	}

	//コンボボックス表示
	//切り替えがあったときに、選択されている横幅情報をクッキーに保存
	document.write("<select name=width onChange='setWidth()'>");
	var i;
	for(i=0;i<widthData.length;i++){
		document.write("<option value='" + widthData[i] + "'");
		if(widthIdx == i) document.write(" selected");
		document.write(">" + widthData[i] +"</option>");
	}
	document.write("</select>");	
}

//高さ範囲指定コンボボックスが変更されたときの処理
//高さ情報をクッキーに保存、ランダムアニメーションへのリンクを更新
function setHeightIdx(){
	//保存
	var selectedHeightIdx1 = document.siteswapForm.height1.selectedIndex;
	var selectedHeightIdx2 = document.siteswapForm.height2.selectedIndex;
	setCookie("heightIdx1",selectedHeightIdx1);
	setCookie("heightIdx2",selectedHeightIdx2);
	
	//大域変数にも格納
	var h1 = eval(selectedHeightIdx1), h2 = eval(selectedHeightIdx2);
	if(h1>h2){
		Hmax = h1;
		Hmin = h2;
	}else{
		Hmax = h2;
		Hmin = h1;
	}
	//ランダムアニメーションへのリンクを更新
	setRandomAnimationLink();
	//ランダムボタンの使用可/不可を更新
	setRandomSSButtonState();
}

//高さ範囲指定コンボボックス表示
function dispHeightComboBox(){
	//表示用データ
	var heightData = new Array(36);	
	var i;
	for(i=0; i<=35; i++) heightData[i] = i + "";

	//クッキーからインデックスを取り出す
	var heightIdx1 = CookieRead("heightIdx1");
	var heightIdx2 = CookieRead("heightIdx2");	
	if(heightIdx1 == "" || heightIdx1 == null){				//クッキーにデータがなかった場合
		heightIdx1 = 0;
	}else{
		heightIdx1 = Math.floor(heightIdx1);
		if(heightIdx1<0 || heightIdx1>35)	heightIdx1 = 0;	//クッキーに不正なデータがあった場合
	}
	if(heightIdx2 == "" || heightIdx2 == null){				//クッキーにデータがなかった場合
		heightIdx2 = 9;
	}else{
		heightIdx2 = Math.floor(heightIdx2);
		if(heightIdx2<0 || heightIdx2>35)	heightIdx2 = 9;	//クッキーに不正なデータがあった場合
	}	
	
	//大域変数にも格納
	if(heightIdx1>heightIdx2){
		Hmax = heightIdx1;
		Hmin = heightIdx2;
	}else{
		Hmax = heightIdx2;
		Hmin = heightIdx1;
	}

	//コンボボックス表示
	document.write("<select name=height1 onChange='setHeightIdx()'>");
	for(i=0;i<heightData.length;i++){
		document.write("<option value='" + heightData[i] + "'");
		if(heightIdx1 == i) document.write(" selected");
		document.write(">" + heightData[i] +"</option>");
	}
	document.write("</select>");
	document.write("<font size=2> ～ </font>");
	document.write("<select name=height2 onChange='setHeightIdx()'>");
		for(i=0;i<heightData.length;i++){
		document.write("<option value='" + heightData[i] + "'");
		if(heightIdx2 == i) document.write(" selected");
		document.write(">" + heightData[i] +"</option>");
	}
	document.write("</select>");	
}

//ボール個数指定コンボボックスが変更されたときの処理
//ボール個数をクッキーに保存、ランダムアニメーションへのリンクを更新
function setBallNumIdx(){
	//保存
	var selectedBallNumIdx = document.siteswapForm.ballNum.selectedIndex; 
	setCookie("ballNumIdx",selectedBallNumIdx);
	//ランダムアニメーションへのリンクを更新
	setRandomAnimationLink();
	//ランダムボタンの使用可/不可を更新
	setRandomSSButtonState();
}

//ボール個数指定コンボボックス表示
function dispBallNumComboBox(){
	//表示用データ
	ballNumData = new Array(36);
	var i;
	for(i=0; i<=35; i++) ballNumData[i] = i + "";

	var n;
	new getHikisuu();
	var nTmp = getHikisuu.data.n;									//URLからボール個数を取り出す
	if(nTmp == "" || nTmp == null) nTmp = CookieRead("ballNumIdx");	//URLにデータがなかった場合はクッキーから取り出す

	//もう一度nullチェック
	if(nTmp == "" || nTmp == null){		//データがなかった場合
		n = 3;
	}else{
		n = Math.floor(nTmp);
		if(n<0 || n>35)	n = 3;			//クッキーに不正なデータがあった場合
	}
	
	//この時点で一応クッキーにも保存
	setCookie("ballNumIdx",n);	

	//コンボボックス表示
	document.write("<select name=ballNum onChange='setBallNumIdx()'>");
	for(i=0;i<ballNumData.length;i++){
		document.write("<option value='" + ballNumData[i] + "'");
		if(n == i) document.write(" selected");
		document.write(">" + ballNumData[i] +"</option>");
	}
	document.write("</select>");
}

//アニメーション用別ウィンドウチェックボックスがクリックされたときの処理
function changeOtherWindowState(obj){
	//アニメーション用別ウィンドウ表示フラグをチェックボックスから取得
	otherWindowFlag = obj.checked;

	//クッキーにセット
	if(otherWindowFlag) setCookie("otherWindow",1);
	else setCookie("otherWindow",0);

	//表示時には別ウィンドウを表示、非表示時には別ウィンドウを閉じる
	if(otherWindowFlag){
		dispAnimationInOtherWindow();
	}else{
		closeOtherWindow();
	}
}

//アニメーションを別ウィンドウで表示するチェックボックス
function dispOtherWindowCheckBox(){
	//クッキーから表示フラグを取得
	var tmpOtherWin = CookieRead("otherWindow");
	if(tmpOtherWin =="1") otherWindowFlag = true;
	else otherWindowFlag = false;

	//チェックボックス表示
	document.write("<input type='checkbox' name='otherWindow' value='' ");
	document.write("onClick='changeOtherWindowState(this)' ");
	if(otherWindowFlag) document.write('checked');
	document.write('>');
}

//サイトスワップの軌道(文字列)を表示するhtmlを返す
function charOrbitString(charOrbit){
	var i,str="";
	//画面サイズに影響されないように表サイズを固定	
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

//サイトスワップの軌道(ボール)を表示するhtmlを返す
function ballOrbitString(ballOrbit){
	var i,str="";
	nullImage = "image/null.png";
	//画面サイズに影響されないように表サイズを固定
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

//tdタグ付で文字列を表示
function td(str){
	document.write("<td>" + str + "</td>");	
}

//tdタグ付+色つきで文字列を表示

function td_c(str,color){
	document.write("<td bgcolor=" + color + ">" + str + "</td>");	
}

//pタグ付で文字列を表示
function p(str){
	document.write("<p>" + str + "</p>");	
}

//状態文字列({0,1,2}とか)を生成
function makeCharState(ballNum,state){
	var b = calcBinary(state);
	var i,charState = "{",count=0,returnPoint = 40;
	//ボールが20個未満なら改行を入れない
	if(ballNum>=20) returnPoint = Math.floor(ballNum/2);
	//文字列生成
	for(i=0;i<b.length;i++){
		if(b[i]==1){
			charState += i;
			count++;									//個数をカウント
			if(i!=b.length-1) charState += ",";			//区切りのカンマを入れる(最後は除く)
			if(count==returnPoint) charState += "<br>";	//半分まできたら改行を入れる
		}
	}
	charState += "}";
	return(charState);
}

//サイトスワップ情報を表示
function dispInfo(ballNum,intSS,state){
	//状態文字列({0,1,2}とか)を生成
	var charState = makeCharState(ballNum,state);
	document.write("<table class=b border=1>");
		document.write("<tr bgcolor=#d5eaff>");
			document.write("<td width=28>個数</td>");
			document.write("<td width=28>周期</td>");
			document.write("<td width=56>分類</td>");
			td("状態数");
			td("状態");
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

//2つのサイトスワップの情報を受け取り、表にして表示
function dispInfo2(charSS1,charSS2){
	var intSS1 = toEval(charSS1);
	var intSS2 = toEval(charSS2);	
	var jugglable1 = juggleCheck(intSS1);
	var jugglable2 = juggleCheck(intSS2);

	//基本ステータス計算	
	if(jugglable1){
		var ballNum1 = calcBallNum(intSS1);
		var state1 = calcState(intSS1);
		var charState1 = makeCharState(ballNum1,state1);
	}
	if(jugglable2){
		//基本ステータス計算
		var ballNum2 = calcBallNum(intSS2);
		var state2 = calcState(intSS2);	
		var charState2 = makeCharState(ballNum2,state2);
	}

	document.write("<table class=b border=1>");

	document.write("<tr bgcolor=#d5eaff>");
		document.write("<td bgcolor=white border=0></td>");
		td("ジャグリング");
		td("個数");
		td("周期");
		td("分類");
		td("状態数");
		td("状態");
	document.write("</tr>");
	
	document.write("<tr bgcolor=#ffffd5>");
		if(jugglable1){
			document.write("<td>"); a_intSS(intSS1); document.write("</td>");
			td("○");
			td(ballNum1);
			td(intSS1.length);
			td(strState(state1));
			td(state1);
			td(charState1);
		}
		else{
			td(charSS1);
			td("×");
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
			td("○");
			td(ballNum2);
			td(intSS2.length);
			td(strState(state2));
			td(state2);
			td(charState2);
		}
		else{
			td(charSS2);
			td("×");
			td("-");
			td("-");
			td("-");
			td("-");
			td("-");
		}
	document.write("</tr>");

	document.write("</table>");
};


//関連サイトスワップを表示
function dispRelatedSSInfo(revSS,showerSS,z01SS,resolSS,grandSS,plus1SS,minus1SS){
	var nextUrl,a,i;
	document.write("<table class=b border=1>");

	document.write("<tr bgcolor=#ffd5ea>");
		document.write("<td colspan='2'>関連サイトスワップ</td>");
	document.write("</tr>");

	document.write("<tr>");
		document.write("<td bgcolor=#d5eaff width=70>リバース</td>");
		nextUrl = "analyzeSS.html?siteswap1=" + revSS;
		a = a_s(nextUrl,revSS);
		td_c(a,"#ffffd5");
	document.write("</tr>");

	document.write("<tr>");
		document.write("<td bgcolor=#d5eaff width=70>シャワー化</td>");
		if(showerSS!=""){
			nextUrl = "analyzeSS.html?siteswap1=" + showerSS;
			a = a_s(nextUrl,showerSS);
		}else{
			a = "不可";
		}
		td_c(a,"#ffffd5");
	document.write("</tr>");

	document.write("<tr>");
		document.write("<td bgcolor=#d5eaff width=70>Z01変換</td>");
		if(z01SS!=""){
			nextUrl = "analyzeSS.html?siteswap1=" + z01SS;
			a = a_s(nextUrl,z01SS);
		}else{
			a = "不可";
		}
		td_c(a,"#ffffd5");
	document.write("</tr>");

	document.write("<tr>");
		document.write("<td bgcolor=#d5eaff width=70>軌道分解</td>");
		a="";
		for(i=0;i<resolSS.length;i++){		//全軌道を表示
			nextUrl = "analyzeSS.html?siteswap1=" + resolSS[i];
			a += a_s(nextUrl,resolSS[i]);
			a += " ";
		}
		td_c(a,"#ffffd5");
	document.write("</tr>");

	document.write("<tr>");
		document.write("<td bgcolor=#d5eaff width=70>基底化</td>");
		a="";
		if(grandSS.length>0){
			for(i=0;i<grandSS.length;i++){		//全軌道を表示		
				nextUrl = "analyzeSS.html?siteswap1=" + grandSS[i];
				a += a_s(nextUrl,grandSS[i]);
				a += " ";
			}
		}else{
			a = "不可";
		}
		td_c(a,"#ffffd5");
	document.write("</tr>");
	
	document.write("<tr>");
		document.write("<td bgcolor=#d5eaff width=70>ボール+1</td>");
		a="";
		if(plus1SS.length>0){
			for(i=0;i<plus1SS.length;i++){		//全+1SSを表示		
				nextUrl = "analyzeSS.html?siteswap1=" + plus1SS[i];
				a += a_s(nextUrl,plus1SS[i]);
				a += " ";
			}
		}else{
			a = "不可";
		}
		td_c(a,"#ffffd5");
	document.write("</tr>");	
	
	document.write("<tr>");
		document.write("<td bgcolor=#d5eaff width=70>ボール-1</td>");
		a="";
		if(minus1SS.length>0){
			for(i=0;i<minus1SS.length;i++){		//全-1SSを表示		
				nextUrl = "analyzeSS.html?siteswap1=" + minus1SS[i];
				a += a_s(nextUrl,minus1SS[i]);
				a += " ";
			}
		}else{
			a = "不可";
		}
		td_c(a,"#ffffd5");
	document.write("</tr>");
}

//2を底とする対数を返す
function log2(a){
  var r;
  r=Math.log(a)/Math.log(2.0);
  return(r);
}

//状態を返す(a=2^n-1なら基底状態)
function strState(a){
	var n;
	a++;
	n = Math.floor(log2(a));
	if(Math.pow(2,n)==a) return("基底状態");
	if(Math.pow(2,n+1)==a) return("基底状態");
	return("励起状態");
}

//状態を返す(基底:1,励起:0)
function calcStateNum(intSS){
	var state = calcState(intSS);
	var n;
	state++;
	n = Math.floor(log2(state));
	if(Math.pow(2,n)==state) return(1);
	if(Math.pow(2,n+1)==state) return(1);
	return(0);	
}

//str1のn文字目をstr2で置換
function replaceString(str1,str2,n){

	before = str1.substring(0,n);
	after = str1.substring(n+1);
	return(before + str2 + after);
}


//リバースサイトスワップ(文字列)を返す
function calcRevSS(intSS,charSS){
	var i,j,l=intSS.length;	
	var revSSArray = new Array(l);	
	//ひっくり返す→数字分戻す
	for(i=0; i<l; i++){
		j=l-1-(i+intSS[i])%l;
		revSSArray[j] = charSS.charAt(i); 
	}

	var revSS = "";
	for(j=0;j<l;j++){			//文字列として連結
		revSS += revSSArray[j];
	}
	return(revSS);
}

//シャワー化サイトスワップ(文字列)を返す
function calcShowerSS(intSS){
	var i,l = intSS.length;
	//不可なら""を返す
	for(i=0;i<l;i++) if(intSS[i]==0 || intSS[i]>18) return("");
	var showerSS = "";
	for(i=0;i<l;i++){
		showerSS += ch[intSS[i]*2-1];
		showerSS += "1";
	}
	return(showerSS);
}

//軌道分解サイトスワップ(文字列配列)を返す
function calcResolSS(intSS,charSS){
	var copyIntSS = copyArray(intSS);	//遷移元に影響を与えないようにコピー
	var resolSS = new Array();
	var i,l = copyIntSS.length;

	//0が含まれていたら分解不可
	for(i=0;i<l;i++){
		if(copyIntSS[i]==0){
			resolSS[0] = charSS;
			return(resolSS);			//分解せずにそのまま返す
		}
	}
	//軌道分解実施
	var tmp,j=0,k;				//j番目の軌道を記録
	var intTmpSS = new Array(l);
	for(i=0;i<l;i++){
		if(copyIntSS[i]!=0){		
			for(k=0;k<l;k++) intTmpSS[k]=0;		//軌道をリセット
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
	//残りが全部0でなければ軌道に追加
	var check = false;
	for(i=0;i<l;i++) if(copyIntSS[i]!=0){check=true; break;}
	if(check) resolSS[j] = toChar(copyIntSS);

	return(resolSS);
}

//サイトスワップをループさせて基底状態のものの一覧を返す
function calcGrandSS(intSS){
	var grandSS = new Array();
	var shiftSS = copyArray(intSS);
	var i=0;
	while(1){	
		if(calcStateNum(shiftSS) == 1){	//基底状態か判定
			grandSS[i] = toChar(shiftSS);
			i++;
		}
		shiftSS = calcShiftSS(shiftSS);				//1つ左にシフト
		if(compareArray(intSS,shiftSS)) break;		//最初に戻ったら終了
	}
	return(grandSS);
}

//ボールが1つ多いパターン(文字列)を作る
//①周期を足す ②全部に1を足す
function calcPlus1SS(intSS){
	var l = intSS.length;		//周期
	var plus1SS = new Array();
	var i,j=0,tmpSS;
	//①周期を足す
	for(i=0;i<l;i++){
		tmpSS = copyArray(intSS);
		tmpSS[i]+=l;
		//上限(35)を超えていなかったら採用
		if(tmpSS[i]<=35){
			plus1SS[j] = toChar( copyArray(tmpSS) );
			j++;
		}
	}
	//②全部に1を足す(最大値が上限を超えていないときのみ)	
	//周期1のときも①と重複するので除外
	if( calcSSMax(intSS)<=34 && l!=1){
		tmpSS = copyArray(intSS);
		for(i=0;i<l;i++) tmpSS[i]+=1;
		plus1SS[j] = toChar( copyArray(tmpSS) );
	}
	
	return(plus1SS);
}

//ボールが1つ少ないパターン(文字列)を作る
//①周期を引く ②全部から1を引く
function calcMinus1SS(intSS){
	var l = intSS.length;		//周期
	var minus1SS = new Array();
	var i,j=0,tmpSS;
	for(i=0;i<l;i++){
		tmpSS = copyArray(intSS);
		tmpSS[i]-=l;
		//下限(0)を超えていなかったら採用
		if(tmpSS[i]>=0){
			minus1SS[j] = toChar( copyArray(tmpSS) );
			j++;
		}
	}
	//②全部に1を足す(最小値が下限を下回っていないときのみ)
	//周期1のときも①と重複するので除外
	if( calcSSMin(intSS)>=1  && l!=1){
		tmpSS = copyArray(intSS);
		for(i=0;i<l;i++) tmpSS[i]-=1;
		minus1SS[j] = toChar( copyArray(tmpSS) );
	}
	
	return(minus1SS);
}

//サイトスワップをZ01拡張(文字列)する
function calcZ01SS(intSS){
	var l = intSS.length;		//周期
	//不可なら""を返す
	for(i=0;i<l;i++) if(intSS[i]==0 || intSS[i]>12) return("");
	var Z01SS = "";
	for(i=0;i<l;i++){
		Z01SS += ch[intSS[i]*3-1];
		Z01SS += "0";
		Z01SS += "1";
	}	
	return(Z01SS);
}

//サイトスワップを1つ左にシフトさせて返す
function calcShiftSS(intSS){
	var shiftSS = new Array();
	var i;
	for(i=0; i<intSS.length-1; i++) shiftSS[i] = intSS[i+1];
	shiftSS[i] = intSS[0];		//先頭を代入
	return(shiftSS);
}

//サイトスワップを左右にn個シフトさせて返す(p=-1:左シフト、p=1:右シフト)
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

//サイトスワップの指定位置の値が先頭/末尾に来るようにシフト(p=-1:先頭、p=1:末尾)
//abcde,3,-1→deabc   abcde,3,1→eabcd
function calcShiftSS3(intSS,x,p){
	var shiftSS;
	if(p==1) shiftSS = calcShiftSS2(intSS,intSS.length-x-1,1);
	else shiftSS = calcShiftSS2(intSS,x,-1);
	return(shiftSS);
}

//配列の中身を比較(一致:true,不一致:false)
function compareArray(array1,array2){
	if(array1.length != array2.length) return(false);	//長さが違えば不一致
	var i;
	for(i=0; i<array1.length; i++){
		if(array1[i] != array2[i]) return(false);
	}
	return(true);
}

//上限(Hmax)と下限(Hmin)を超えない範囲で、index以降の値を左に寄せる
function moveLeft(tmpSS,index){
	var i,l=tmpSS.length;
	
	//index以降の値の合計を計算(index=1 : 2,3,1,4なら3+1+4=8)
	var sum = 0;
	for(i=index; i<l; i++) sum += tmpSS[i];

	if( sum/(l-index)<Hmin ) return(null);		//下限を上回れない場合はnullを返す
	if( sum>(l-index)*Hmax ) return(null);		//上限を下回れない場合はnullを返す

	//下限を分配
	for(i=index; i<l; i++) tmpSS[i]=Hmin;
	sum -= (l-index)*Hmin;	//下限の分

	//上限を超えない範囲でindex番目から足していく
	var a = Hmax - Hmin;		//i番目に足せる値の最大値
	var b;						//実際に足す数
	for(i=index; i<l; i++){		
		if(sum == 0) break;		//これ以上足せなくなったらおわり
		if(a>=sum) b = sum;		//sumの方が少ないのでsum分だけ足す
		else b = a;				//上限まで足す		
		tmpSS[i] += b;
		sum -= b;
	}
	return(tmpSS);
}

//上限(Hmax)と下限(Hmin)を超えない範囲で、index以降の値を右に寄せる
function moveRight(tmpSS,index){
	var i,l=tmpSS.length;

	//index以降の値の合計を計算(index=1 : 2,3,1,4なら3+1+4=8)
	var sum = 0;
	for(i=index; i<l; i++) sum += tmpSS[i];

	if( sum/(l-index)<Hmin ) return(null);		//下限を上回れない場合はnullを返す
	if( sum>(l-index)*Hmax ) return(null);		//上限を下回れない場合はnullを返す

	//下限を分配
	for(i=index; i<l; i++) tmpSS[i]=Hmin;
	sum -= (l-index)*Hmin;	//下限の分

	//上限を超えない範囲で末尾から足していく
	var a = Hmax - Hmin;		//i番目に足せる値の最大値
	var b;						//実際に足す数
	for(i=l-1; i>=index; i--){
		if(sum == 0) break;		//これ以上足せなくなったらおわり
		if(a>=sum) b = sum;		//sumの方が少ないのでsum分だけ足す
		else b = a;				//上限まで足す		
		tmpSS[i] += b;
		sum -= b;
	}
	return(tmpSS);
}

//入力数字列を次の列に変換(4012→4003→3400)
//変換不可ならnullを返す
function nextStep(tmpSS){
	var i;
	//長さ1or0なら変換不可
	if(tmpSS.length<=1) return(null);
	//右から数字を見る
	for(i=tmpSS.length-2; i>=0; i--){
		//移動可能(上限を下回るand下限を上回る)かを判定
		if(tmpSS[i]-1>=Hmin && tmpSS[i+1]+1<=Hmax){		
			//移動実行
			tmpSS[i]-=1;
			tmpSS[i+1]+=1;
			tmpSS = moveLeft(tmpSS,i+1);
			return(tmpSS);
		}
	}
	//移動が発生しなかった場合は変換不可
	return(null);
}

//入力数字列を次の列に変換(3400→4003→4012)
//変換不可ならnullを返す
function prevStep(tmpSS){
	var i;
	//長さ1or0なら変換不可
	if(tmpSS.length<=1) return(null);	
	//右から数字を見る
	for(i=tmpSS.length-1; i>=1; i--){
		//移動可能(上限を下回るand下限を上回る)かを判定
		if(tmpSS[i]-1>=Hmin && tmpSS[i-1]+1<=Hmax){
			//移動実行
			tmpSS[i]-=1;
			tmpSS[i-1]+=1;
			tmpSS = moveRight(tmpSS,i);
			return(tmpSS);
		}
	}
}

//tmpSSスタートで虫食いサイトスワップを計算して画面表示
//z=1→昇順、z=2→降順(表示は常に昇順)
function dispBlankSS(intSS,tmpSS,p,ballNum,z){
	var i,count =0;
	if(z==1){				//昇順
		while(1){
			if(tmpSS == null || count == BlankMax) break;
			//一時配列をブランク部分に当てはめる
			for(i=0; i<p.length; i++) intSS[p[i]] = tmpSS[i];
			//ジャグリング可能なら表示
			if(juggleCheck(intSS)){
				a_intSS(intSS);
				document.write(" ");
				count++;
			}			
			tmpSS = nextStep(tmpSS);
		}
	}else{					//降順
		var stackSS = new Array();
		while(1){
			if(tmpSS == null || count == BlankMax) break;
			//一時配列をブランク部分に当てはめる
			for(i=0; i<p.length; i++) intSS[p[i]] = tmpSS[i];
			//ジャグリング可能なら保存
			if(juggleCheck(intSS)){
				stackSS[count] = Array.apply(null,intSS);
				count++;
			}
			tmpSS = prevStep(tmpSS);			
		}
		//一旦保存したサイトスワップ列を昇順表示	
		for(i=count-1;i>=0;i--){
			a_intSS(stackSS[i]);
			document.write(" ");
		}
	}
	if(count==0) document.write("なし");
		
	//tmpSSをジャグリング可能になるまで送る(何もないのにリンクが表示されるのを防止)
	while(1){
		if(tmpSS==null) break;
		for(i=0; i<p.length; i++) intSS[p[i]] = tmpSS[i];
		if(juggleCheck(intSS)) break;
		if(z==1) tmpSS = nextStep(tmpSS);
		else tmpSS = prevStep(tmpSS);
	}
	return(tmpSS);		//表示したものの次のtmpSSを返す(nullの場合もある)
}

//tmpSSスタートで虫食い糊を計算して画面表示
//z=1→昇順、z=2→降順(表示は常に昇順)
function dispBlankTrans(state1,state2,charSS1,intTrans,charSS2,tmpSS,p,ballNum,transSum,z){
	var i,count =0;
	if(z==1){				//昇順
		while(1){
			if(tmpSS == null || count == BlankMax2) break;
			//一時配列をブランク部分に当てはめる
			for(i=0; i<p.length; i++) intTrans[p[i]] = tmpSS[i];
			//ジャグリング可能なら表示
			if(transCheck(state1,intTrans,state2)){
				a_charSS1_intTrans_charSS2(charSS1,intTrans,charSS2);
				document.write(" ");
				count++;
			}			
			tmpSS = nextStep(tmpSS);
		}
	}else{					//降順
		var stackSS = new Array();
		while(1){
			if(tmpSS == null || count == BlankMax2) break;
			//一時配列をブランク部分に当てはめる
			for(i=0; i<p.length; i++) intTrans[p[i]] = tmpSS[i];
			//ジャグリング可能なら保存
			if(transCheck(state1,intTrans,state2)){
				stackSS[count] = Array.apply(null,intTrans);
				count++;
			}
			tmpSS = prevStep(tmpSS);			
		}
		//一旦保存したサイトスワップ列を昇順表示	
		for(i=count-1;i>=0;i--){
			a_charSS1_intTrans_charSS2(charSS1,stackSS[i],charSS2);
			document.write(" ");
		}
	}
	if(count==0) document.write("なし");
		
	//tmpSSをジャグリング可能になるまで送る(何もないのにリンクが表示されるのを防止)
	while(1){
		if(tmpSS==null) break;
		for(i=0; i<p.length; i++) intTrans[p[i]] = tmpSS[i];
		if(transCheck(state1,intTrans,state2)) break;
		if(z==1) tmpSS = nextStep(tmpSS);
		else tmpSS = prevStep(tmpSS);
	}
	return(tmpSS);		//表示したものの次のtmpSSを返す(nullの場合もある)
}

//虫食い糊つきサイトスワップを表示
function dispTransWithBlank(charSS1,charTrans,charSS2){
	var intSS1 = toEval(charSS1);
	var intTrans = toEval(charTrans);
	var intSS2 = toEval(charSS2);
	lt = charTrans.length;
	var i,j,sum,astaNum;
	var p = new Array();
	
	//サイトスワップ表示
	document.write("<h3 style='display:inline;'>" + charSS1 + "-" + charTrans + "-" + charSS2 + "</h3>");
	document.write("<br><br>");
	
	//基本情報表示,基本情報計算
	dispInfo2(charSS1,charSS2);
	var state1 = calcState(intSS1);
	var state2 = calcState(intSS2);
	var ballNum1 = calcBallNum(intSS1);
	var ballNum2 = calcBallNum(intSS2);
	var jugglable1 = juggleCheck(intSS1);
	var jugglable2 = juggleCheck(intSS2);

	//糊部分の合計を求める
	var transSum = calcTransSum(state1,lt,state2);

	//接続不可が確定しているときは計算を省略して終了
	//前後のサイトスワップがジャグリング不可か、ボール数が違えば接続は必ず不可	
	if(ballNum1 != ballNum2 || !jugglable1 || !jugglable2 || transSum == -1){
		document.write("<br>");	
		document.write("<table class=b border=1><tr>");
		td_c("適合サイトスワップ一覧","#d5eaff");
		document.write("</tr><tr bgcolor=#ffffd5><td>なし</td></tr></table>");
		return;
	}

	//ボール個数をセット
	var ballNum = calcBallNum(intSS1);

	//'*'の数と、'*'以外の数字の合計をカウント
	sum = astaNum = j = 0;
	for(i=0;i<lt;i++){
		if(intTrans[i]==-1) {		//*の位置をpとして記録
			astaNum++;
			p[j]=i;
			j++;
		}
		else sum+=intTrans[i];
	}
	
	//URLから一時配列を取り出す
	//tパラメータは、1文字目が昇順逆順、2文字目以降が一時配列を文字列化したもの
	//z=1:昇順、z=2：逆順、z=3：lastリンク押下(処理後z=2になる)
	var z,tFlag = false;
	new getHikisuu();
	var t = getHikisuu.data.t;
	if(t != null){		//入力チェック
		var reg = RegExp("^[1-3][0-9a-zA-Z]+$");
		if (t.match(reg)) {
			z = eval(t.charAt(0));
			var tmpUrlSS = toEval(t.substring(1));
			//整合性チェック
			j=0;
			for(i=0;i<tmpUrlSS.length;i++) j+=tmpUrlSS[i];
			if(tmpUrlSS.length == astaNum && j==transSum-sum) tFlag = true;
		}
	}

	//計算用の一時配列を用意	
	var tmpSS = new Array(astaNum);
	if(tFlag){			//URLからの一時配列取得に成功したとき
		tmpSS = Array.apply(null,tmpUrlSS);
		//"last"リンクが押されていた場合は、右に寄せる
		if(z==3){
			tmpSS = moveRight(tmpSS,0);
			z=2;
		}
	}else{				//URLからの取得がなかったときは昇順、最初から
		tmpSS[0] = transSum - sum;				//*部分の合計を記録
		for(i=1; i<tmpSS.length; i++) tmpSS[i]=0;
		//初期設定
		tmpSS = moveLeft(tmpSS,0);
		z = 1;
	}

	//一時配列の初期値(の1つ前)をとっておく
	if(z==1){
		tmpPrevSS = Array.apply(null,tmpSS);
		tmpPrevSS = prevStep(tmpPrevSS);
	}else{
		tmpNextSS = Array.apply(null,tmpSS);
		tmpNextSS = nextStep(tmpNextSS);	
	}

	//テーブル表示開始
	document.write("<br>");	
	document.write("<table class=b border=1>");
	document.write("<tr>");
	td_c("適合サイトスワップ一覧","#d5eaff");	
	document.write("</tr>");	

	document.write("<tr bgcolor=#ffffd5>");	
	document.write("<td>");

	//一時配列の最終値(の1つ前)をとっておく
	if(z==1){
		tmpNextSS = dispBlankTrans(state1,state2,charSS1,intTrans,charSS2,tmpSS,p,ballNum,transSum,z);
	}else{
		tmpPrevSS = dispBlankTrans(state1,state2,charSS1,intTrans,charSS2,tmpSS,p,ballNum,transSum,z);
	}
	document.write("</td>");
	document.write("</tr>");
	
	//prev,nextリンク生成
	if(tmpPrevSS!=null || tmpNextSS!=null){
		document.write("<tr bgcolor=#dcdcdc>");

		document.write("<td align=center>");
		if(tmpPrevSS!=null){
			//先頭に戻るリンク
			var tmpTopSS = Array.apply(null,tmpPrevSS);
			var tmpTopCharSS = "1" + toChar(moveLeft(tmpTopSS,0));
			var topLink = 'analyzeSS.html?'
						 + 'siteswap1=' + charSS1 + '&'
						 + 'trans=' + charTrans + '&'
						 + 'siteswap2=' + charSS2;
			a(topLink,"＜＜top");			
			blank(10);
			//1つ戻るリンク
			var tmpPrevCharSS = "2" + toChar(tmpPrevSS);
			var prevLink = 'analyzeSS.html?'
						 + 'siteswap1=' + charSS1 + '&'
						 + 'trans=' + charTrans + '&'
						 + 'siteswap2=' + charSS2 + '&'
						 + 't=' + tmpPrevCharSS;
			a(prevLink,"＜prev");
		}else{
			blank(32);
		}
		blank(2);
		if(tmpNextSS!=null){
			//1つ進むリンク
			var tmpNextCharSS = "1" + toChar(tmpNextSS);
			var nextLink = 'analyzeSS.html?'
						 + 'siteswap1=' + charSS1 + '&'
						 + 'trans=' + charTrans + '&'
						 + 'siteswap2=' + charSS2 + '&'
						 + 't=' + tmpNextCharSS;
			a(nextLink,"next＞");
			blank(10);			
			//末尾まで進むリンク
			var tmpLastSS = Array.apply(null,tmpNextSS);
			var tmpLastCharSS = "3" + toChar(moveRight(tmpLastSS,0));
			var topLink = 'analyzeSS.html?'
						 + 'siteswap1=' + charSS1 + '&'
						 + 'trans=' + charTrans + '&'
						 + 'siteswap2=' + charSS2 + '&'
						 + 't=' + tmpLastCharSS;
			a(topLink,"last＞＞");			
		}else{
			blank(32);
		}
		document.write("</td>");
		document.write("</tr>");
	}
	document.write("</table>");
}

//ブランクワード付サイトスワップを計算
function dispSSWithBlank(charSS,ballNum){
	var intSS = toEval(charSS);
	var i,j,sum,astaNum, l = intSS.length;
	var p = new Array();
	var tmpPrevSS = new Array();
	var tmpNextSS = new Array();

	//サイトスワップ表示
	document.write("<h3 style='display:inline;'>" + charSS + "&nbsp;&nbsp;&nbsp;&nbsp;" + ballNum + "ボール</h3>");
	blank(3);
	//ボール個数+1,-1へのリンク
	var nextUrlP1 = "analyzeSS.html?siteswap1=" + charSS + "&n=" + (ballNum+1);
	var nextUrlM1 = "analyzeSS.html?siteswap1=" + charSS + "&n=" + (ballNum-1);
	document.write("<font size=2>");
		if(ballNum<35) a(nextUrlP1,"ボール+1"); else document.write("ボール+1");
		blank(3);
		if(ballNum>0)  a(nextUrlM1,"ボール-1"); else document.write("ボール-1");
	document.write("</font>");
	document.write("<br><br>");
	//ジャグリング不可が確定しているときは計算を省略して終了
	if(!juggleCheck2(intSS)){
		document.write("<table class=b border=1><tr>");
		td_c("適合サイトスワップ一覧","#d5eaff");
		document.write("</tr><tr bgcolor=#ffffd5><td>なし</td></tr></table>");
		return;
	}

	//'*'の数と、'*'以外の数字の合計をカウント
	sum = astaNum = j = 0;
	for(i=0;i<l;i++){
		if(intSS[i]==-1) {		//*の位置をpとして記録
			astaNum++;
			p[j]=i;
			j++;
		}
		else sum+=intSS[i];
	}
	//URLから一時配列を取り出す
	//tパラメータは、1文字目が昇順逆順、2文字目以降が一時配列を文字列化したもの
	//z=1:昇順、z=2：逆順、z=3：lastリンク押下(処理後z=2になる)
	var z,tFlag = false;
	new getHikisuu();
	var t = getHikisuu.data.t;
	if(t != null){		//入力チェック
		var reg = RegExp("^[1-3][0-9a-zA-Z]+$");
		if (t.match(reg)) {
			z = eval(t.charAt(0));
			var tmpUrlSS = toEval(t.substring(1));
			//整合性チェック
			j=0;
			for(i=0;i<tmpUrlSS.length;i++) j+=tmpUrlSS[i];
			if(tmpUrlSS.length == astaNum && j==ballNum*intSS.length-sum) tFlag = true;
		}
	}
	//計算用の一時配列を用意	
	var tmpSS = new Array(astaNum);
	if(tFlag){			//URLからの一時配列取得に成功したとき	
		tmpSS = Array.apply(null,tmpUrlSS);
		//"last"リンクが押されていた場合は、右に寄せる
		if(z==3){
			tmpSS = moveRight(tmpSS,0);
			z=2;
		}
	}else{				//URLからの取得がなかったときは昇順、最初から
		tmpSS[0] = l*ballNum - sum;				//*部分の合計を記録		
		for(i=1; i<tmpSS.length; i++) tmpSS[i]=0;		
		//初期設定
		tmpSS = moveLeft(tmpSS,0);		
		z = 1;
	}
	//一時配列の初期値(の1つ前)をとっておく
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
	
	//テーブル表示開始
	document.write("<table class=b border=1>");
	document.write("<tr>");
	td_c("適合サイトスワップ一覧","#d5eaff");	

	document.write("</tr>");	

	document.write("<tr bgcolor=#ffffd5>");	
	document.write("<td>");
	//一時配列の最終値(の1つ前)をとっておく
	if(z==1){
		tmpNextSS = dispBlankSS(intSS,tmpSS,p,ballNum,z);
	}else{
		tmpPrevSS = dispBlankSS(intSS,tmpSS,p,ballNum,z);
	}
	document.write("</td>");
	document.write("</tr>");
	//prev,nextリンク生成
	if(tmpPrevSS!=null || tmpNextSS!=null){
		document.write("<tr bgcolor=#dcdcdc>");

		document.write("<td align=center>");
		if(tmpPrevSS!=null){
			//先頭に戻るリンク
			var tmpTopSS = Array.apply(null,tmpPrevSS);
			var tmpTopCharSS = "1" + toChar(moveLeft(tmpTopSS,0));
			var topLink = 'analyzeSS.html?'
						 + 'siteswap1=' + charSS + '&'
						 + 'n=' + ballNum;
			a(topLink,"＜＜top");			
			blank(10);
			//1つ戻るリンク
			var tmpPrevCharSS = "2" + toChar(tmpPrevSS);
			var prevLink = 'analyzeSS.html?'
						 + 'siteswap1=' + charSS + '&'
						 + 'n=' + ballNum + '&'
						 + 't=' + tmpPrevCharSS;			
			a(prevLink,"＜prev");
		}else{
			blank(32);
		}
		blank(2);
		if(tmpNextSS!=null){
			//1つ進むリンク
			var tmpNextCharSS = "1" + toChar(tmpNextSS);
			var nextLink = 'analyzeSS.html?'
						 + 'siteswap1=' + charSS + '&'
						 + 'n=' + ballNum + '&'
						 + 't=' + tmpNextCharSS;			
			a(nextLink,"next＞");
			blank(10);			
			//末尾まで進むリンク
			var tmpLastSS = Array.apply(null,tmpNextSS);
			var tmpLastCharSS = "3" + toChar(moveRight(tmpLastSS,0));
			var topLink = 'analyzeSS.html?'
						 + 'siteswap1=' + charSS + '&'
						 + 'n=' + ballNum + '&'
						 + 't=' + tmpLastCharSS;			
			a(topLink,"last＞＞");			
		}else{
			blank(32);
		}
		document.write("</td>");
		document.write("</tr>");
	}
	document.write("</table>");
}

//前後のサイトスワップを連結計算
function dispDualSS(charSS1,charSS2){
	//---------基本ステータス解析フェーズ---------
	var intSS1 = toEval(charSS1);
	var intSS2 = toEval(charSS2);	
	var jugglable1 = juggleCheck(intSS1);
	var jugglable2 = juggleCheck(intSS2);

	//----------------計算フェーズ----------------
	if(jugglable1){
		//基本ステータス計算
		var ballNum1 = calcBallNum(intSS1);
		var state1 = calcState(intSS1);
	}
	if(jugglable2){
		//基本ステータス計算
		var ballNum2 = calcBallNum(intSS2);		
		var state2 = calcState(intSS2);	
	}
	if(jugglable1 && jugglable2 && state1==state2){
		var ballNum = ballNum1;		//接続可能なのでボールの個数は1と2で等しい
		//軌道を計算
		var intOrbit = calcIntOrbit2(intSS1,intSS2);
		var charOrbit = calcCharOrbit(intOrbit)
		var ballOrbit = calcBallOrbit(intOrbit,ballNum);
	}
	//----------------表示フェーズ----------------
	//サイトスワップ表示
	document.write("<h3 style='display:inline;'>" + charSS1 + "-" + charSS2 + "</h3>");
	
	//接続可能なとき
	if(jugglable1 && jugglable2 && state1==state2){
		blank(3);
		//アニメーション表次ページへのリンク
		a_juggle2(charSS1,charSS2);	
		document.write("<br><br>");
		
		//起動を表示するエリア
		document.write('<span id="orbitArea"></span>');		
		
		//軌道表示
		document.getElementById("orbitArea").innerHTML
			= charOrbitString(charOrbit) 				//軌道(文字列)を表示
			+ ballOrbitString(ballOrbit);   			//軌道(ボール)を表示		
		
		document.write("<br>");
	}
	//接続不可能なとき
	else{
		document.write("<p><font color=red>接続不可</font></p>");
	}
	dispInfo2(charSS1,charSS2);
}

//前後の状態数と糊の長さから、糊の合計を求める
//計算不可なら-1を返す
function calcTransSum(state1,lt,state2){
	//状態を2進数に変換,長さを計算
	var b1 = calcBinary(state1);
	var b2 = calcBinary(state2);
	var ls1 = b1.length;
	var ls2 = b2.length;
	if(lt+ls2<ls1) {return(-1);}   //前の状態長が長すぎると不可
	//前状態と後ろ状態の重なりを調べる
	var i,j=0,k;
	for(i=lt;i<ls1;i++){
	  if(b1[i]==1 && b2[j]==1) b2[j]=0;
	  else if(b1[i]==1 && b2[j]==0) return(-1);
	  j++;
	}
	//合計値sumを計算
	var sum=0;
	if(ls1>lt) k=lt; else k=ls1;
	for(i=0;i<k;i++) sum+= (lt-i)*b1[i];   
	for(j=0;j<ls2;j++) if(b2[j]==1) sum+=j;  
	return(sum);
}

//状態数から、状態幅(2進数に変換したときの桁数)を求める
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

//連結つきサイトスワップを表示
function dispTripleSS(charSS1,charTrans,charSS2){
	var i;
	//---------基本ステータス解析フェーズ---------
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

	//----------------計算フェーズ----------------
	var transable = true;		//接続の可、不可が入る
	//前後のサイトスワップがジャグリング不可か、ボール数が違えば接続は必ず不可
	if(ballNum1 != ballNum2 || !jugglable1 || !jugglable2){
		transable = false;
	}else{
		transable = transCheck(state1,intTrans,state2);		//遷移可能かチェック
	}	
	if(transable){		//接続可能なとき
		calcIntOrbit3(intSS1,intTrans,intSS2)
		var ballNum = ballNum1;		//接続可能なのでボールの個数は1と2で等しい
		//軌道を計算
		var intOrbit = calcIntOrbit3(intSS1,intTrans,intSS2);
		var charOrbit = calcCharOrbit(intOrbit)
		var ballOrbit = calcBallOrbit(intOrbit,ballNum);
	}
	//----------------表示フェーズ----------------
	//サイトスワップ表示
	document.write("<h3 style='display:inline;'>" + charSS1 + "-" + charTrans + "-" + charSS2 + "</h3>");
	
	//接続可能なとき
	if(transable){
		blank(3);
		//アニメーション表次ページへのリンク
		a_juggle3(charSS1,charTrans,charSS2);	
		document.write("<br><br>");		

		//軌道を表示するエリア
		document.write('<span id="orbitArea"></span>');
		
		//軌道表示
		document.getElementById("orbitArea").innerHTML
			= charOrbitString(charOrbit) 				//軌道(文字列)を表示
			+ ballOrbitString(ballOrbit);   			//軌道(ボール)を表示		
		
		document.write("<br>");
	}
	//接続不可能なとき
	else{
		document.write("<p><font color=red>接続不可</font></p>");
	}
	dispInfo2(charSS1,charSS2);
}

//通常のサイトスワップ表示
function dispNormalSS(charSS){
	var intSS = toEval(charSS);									//文字列をintに変換
	var jugglable = juggleCheck(intSS);							//ジャグリング可能性を判定	
	//ジャグリング可能なとき
	if(jugglable){
		var ballNum = calcBallNum(intSS);						//ボールの個数を判定
		var state = calcState(intSS);							//状態数を計算

		//軌道計算
		var intOrbit = calcIntOrbit(intSS);				
		var charOrbit = calcCharOrbit(intOrbit);
		var ballOrbit = calcBallOrbit(intOrbit,ballNum);	
		//サイトスワップ表示
		document.write("<h3 style='display:inline;'>" + charSS + "</h3>");
		blank(3);
		//アニメーション表示ページへのリンク
		a_juggle1(charSS);
		document.write('&nbsp');

		//軌道を表示するエリア
		document.write('<span id="orbitArea"></span>');
		
		//軌道表示
		document.getElementById("orbitArea").innerHTML
			= charOrbitString(charOrbit) 				//軌道(文字列)を表示
			+ ballOrbitString(ballOrbit);   			//軌道(ボール)を表示
		
		document.write("<br>");
		//関連サイトスワップの計算
		var revSS		= calcRevSS(intSS,charSS);		//リバース
		var showerSS	= calcShowerSS(intSS);			//シャワー
		var z01SS		= calcZ01SS(intSS);				//z01変換
		var resolSS		= calcResolSS(intSS,charSS);	//軌道分解
		var grandSS		= calcGrandSS(intSS);			//基底化
		var plus1SS		= calcPlus1SS(intSS);			//1つ多いSS
		var minus1SS	= calcMinus1SS(intSS);			//1つ少ないSS

		document.write("<table>");
		document.write("<tr><td>");					
			//状態表示
			dispInfo(ballNum,intSS,state);
		document.write("</td></tr>");
		document.write("<tr><td>");
			//関連サイトスワップ表示
			dispRelatedSSInfo(revSS,showerSS,z01SS,resolSS,grandSS,plus1SS,minus1SS);
		document.write("</td></tr>");
		document.write("</table>");
	}else{
		//ジャグリング不可能なとき
		document.write("<h3 style='display:inline;'>" + charSS + "</h3>");
		document.write("<p><font color=red>ジャグリング不可</font></p>");
	}	
}

//指定した任意の位置(x,y)のSSを交換(可、不可は問わない)
//奥に行く値には-,手前に来る値には+
function calcSwapSS(intSS,x,y){
	var swapSS = copyArray(intSS);
	var w = y-x;
	swapSS[x] = intSS[y] + w;
	swapSS[y] = intSS[x] - w;
	return(swapSS);
}

//先頭から走査して指定の数字(n)が入る位置を探す
//見つからなければ-1を返す
function searchNum(intSS,n){
	var i;
	for(i=0;i<intSS.length;i++) if(intSS[i]==n) return(i);
	return(-1);
}

//先頭から走査して、指定の数字(n)がm番目に登場する位置を返す
//見つからなければ-1を返す
//0,1,2,-1,-1,3,-1 ,n:-1,m:1 →4
function searchNum2(intSS,n,m){
	var i,j;
	j=0;		//見つかったnの数
	for(i=0;i<intSS.length;i++){
		if(intSS[i]==n) j++;
		if(j==m) return(i)
	}
	return(-1);
}

//ランダムに0～n-1までが入った配列(長さn)を作成する
function calcRandomBaseSS(n){
	var randomBaseSS = new Array(n);
	var i,j,k,a,r;
	
	//初期化(値が入っていない部分には-1を入れておく)
	for(i=0;i<n;i++) randomBaseSS[i] = -1;	
	k=n;									//値が入る位置の個数
	for(i=0;i<n;i++){
		r = rand(k) + 1;					//値が入る位置をランダムで指定
		r = searchNum2(randomBaseSS,-1,r);	//r番目に登場する-1の位置を計算
		randomBaseSS[r] = i;
		k--;
	}
	return(randomBaseSS);
}

//最小値か最大値の位置を返す(p=-1:最小、p=1:最大)
function calcMinOrMaxPos(intSS,p){
	var i,x=0,m = intSS[0];
	if(p==1){		//最大検索
		for(i=0; i<intSS.length; i++){
			if(intSS[i]>m){m=intSS[i]; x=i;}
		}
	}
	else{			//最小検索
		for(i=0; i<intSS.length; i++){
			if(intSS[i]<m){m=intSS[i]; x=i;}
		}
	}
	return(x);
}

//ランダムなサイトスワップを計算する
//l:周期、ballNum:ボール個数、max:高さ上限、min:高さ下限
function calcRandomSS(l,ballNum,max,min){
	var i,j,r;
	var randomSS = new Array(l);

	//最大値、最小値がボールの個数と一致していたら、可能なSSは基本技のみ
	if(max==ballNum || min==ballNum){
		for(i=0;i<l;i++) randomSS[i] = ballNum;
		return(randomSS);
	}
	//ボールの数がmax,minの間になければ、SS生成不可(nullを返す)
	if(min>ballNum || max<ballNum) return(null);

	var p,pos,flag1;	
	while(1){
		randomSS = calcRandomBaseSS(l);			//0～l-1までの値をセット	
		for(i=0;i<l;i++) randomSS[i] -= i;		//0～l-1まで引く
		
		//ランダムな位置に、周期をボールの数だけ加える
		for(i=0;i<ballNum;i++) randomSS[rand(l)] += l;
		
		//100回試行してダメだったら0からやり直す
		for(i=0;i<100;i++){
			flag1 = 0;
			for(j=0;j<l;j++){
				if(randomSS[j]>max){flag1=1;  pos=j; break;}	//上限を超える数がある
				if(randomSS[j]<min){flag1=-1; pos=j; break;}	//下限を下回る数がある
			}
			//max,minの間に収まっていた場合は合格
			if(flag1 == 0) return(randomSS);

			//高さ範囲をはみ出していた場合,はみ出した部分を端に寄せる
			//上限超え：先頭へ、下限下：末尾へ
			randomSS = calcShiftSS3(randomSS,pos,-flag1);

			//はみ出た部分を、最小/最大の部分と交換
			if(flag1==1){	//上限超え
				p = calcMinOrMaxPos(randomSS,-1);	//最小値の位置を判別
				randomSS = calcSwapSS(randomSS,p,0);
			}
			else{			//下限下
				p = calcMinOrMaxPos(randomSS,1);	//最大値の位置を判別
				randomSS = calcSwapSS(randomSS,p,l-1);
			}
		}
	}
	return(randomSS);	//不要
}

//ランダムなサイトスワップを生成し、詳細画面に遷移する
function moveRandomSS(inputAreaNum){
	var ballNum = document.siteswapForm.ballNum.selectedIndex;	//個数をセレクトボックスから取得
	var l = rand(9) + 1;										//長さは1～10
	var randomIntSS = calcRandomSS(l,ballNum,Hmax,Hmin);		//ランダムSS計算

	//ランダムSS生成不可なら、エラーメッセージを表示する
	if(randomIntSS == null){
		dispMessage("ランダムサイトスワップ生成エラー");
		return;
	}
	var randomCharSS = toChar(randomIntSS);
	var nextUrl = "analyzeSS.html?siteswap1=" + randomCharSS;

	//今までと同じ数の入力欄を出すための処理
	if(inputAreaNum==2) nextUrl += "&siteswap2=";
	if(inputAreaNum==3) nextUrl += "&trans=&siteswap2=";

	window.open(nextUrl,'_self');
}

//別ウィンドウでアニメーションを表示させる(別ウィンドウフラグが立っていた場合のみ)
function dispAnimationInOtherWindow(){
	//アニメーション表示フラグを判定
	if(otherWindowFlag){
		//アニメーションページのURLを生成(解析リンクはオフ)
		var animationURL = makeAnimationURL(false);

		//別ウィンドウ表示(更新)
		//サイズ設定が行われるのは最初の1回のみ。また、サイズ設定を省略すると
		//自動的に別タブで開かれる場合があるので、設定必須。
		otherWindow = window.open(animationURL, "animation_window", "width=440,height=420,scrollbars=yes,resizable=1");
	}
}

//既に開かれているアニメーション用ウィンドウを閉じる
function closeOtherWindow(){
	otherWindow.close();
}