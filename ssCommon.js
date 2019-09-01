ch = new Array
		("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f",
		"g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v",
		"w","x","y","z");

//cookieを保存する,有効期限は半永久(2100年)
function setCookie(cookieName,cookieValue){
	document.cookie = cookieName + "=" + cookieValue
					+ "; expires=Fri, 1-Jan-2100 00:00:00 GMT";
}

//cookieから値(kword)を取り出す
function CookieRead(kword){
	if(typeof(kword) == "undefined")		// キーワードなし
		return "";							// 何もしないで戻る
	kword = kword + "=";
	kdata = "";
	scookie = document.cookie + ";";		// クッキー情報を読み込む
	start = scookie.indexOf(kword);			// キーワードを検索
	if (start != -1){						// キーワードと一致するものあり
		end = scookie.indexOf(";", start);	// 情報の末尾位置を検索
		kdata = unescape(scookie.substring(start + kword.length, end));  // データ取り出し
	}
  return kdata;
}

//配列の中身をコピー
function copyArray(array1){
	var array2 = new Array(array1.length);
	var i;
	for(i=0;i<array1.length;i++) array2[i] = array1[i];
	return(array2);
}

//x文字の空白を表示
function blank(x){
	var i;
	for(i=0;i<x;i++) document.write("&nbsp;");
}

//大きい方の値を返す
function max2(a,b){
	if(a>b) return(a);
	else return(b);
}

//小さい方の値を返す
function min2(a,b){
	if(a<b) return(a);
	else return(b);
}

//サイトスワップ数字列を文字列に変換して返す
function toChar(intSS){
	var charSS="";
	var i;
	for(i=0;i<intSS.length;i++){
		if(intSS[i]==-1) charSS += "*";
		else charSS += ch[intSS[i]];
	}
	return(charSS);
}

//aタグ付で文字列を表示
function a(nextUrl,str){
	document.write("<a href=" + nextUrl + ">" + str + "</a>");
}

//aタグ付で文字列を返す
function a_s(nextUrl,str){
	return("<a href=" + nextUrl + ">" + str + "</a>");
}

//サイトスワップ(数字)を入力、リンクを生成して表示
function a_intSS(intSS){
	var charSS = toChar(intSS);
	var nextUrl = "index.html?siteswap1=" + charSS;
	a(nextUrl,charSS);
}

//サイトスワップ(数字)+糊を入力、リンクを生成して表示
function a_charSS1_intTrans_charSS2(charSS1,intTrans,charSS2){
	var charTrans = toChar(intTrans);
	var nextUrl = "index.html?siteswap1=" + charSS1
				+ "&trans=" + charTrans
				+ "&siteswap2=" + charSS2;
	var nextString = charSS1 + "-" + charTrans + "-" + charSS2;
	a(nextUrl,nextString);
}

//解析ページへのリンク("解析")文字列つき(1つ)
function a_analyze1(charSS1){
	var nextUrl = "index.html?siteswap1=" + charSS1;
	var linkString = "<font size=2><a href=" + nextUrl + ">解析</a></font>";
	return(linkString);
}

//解析ページへのリンク("解析")文字列つき(直接接続)
function a_analyze2(charSS1,charSS2){
	var nextUrl = "index.html?siteswap1=" + charSS1 + "&siteswap2=" + charSS2;
	var linkString = "<font size=2><a href=" + nextUrl + ">解析</a></font>";
	return(linkString);
}

//解析ページへのリンク("解析")文字列つき(糊つき接続)
function a_analyze3(charSS1,charTrans,charSS2){
	var nextUrl = "index.html?siteswap1=" + charSS1 + "&trans=" + charTrans + "&siteswap2=" + charSS2;
	var linkString = "<font size=2><a href=" + nextUrl + ">解析</a></font>";
	return(linkString);
}

//アニメーションページへのリンク("アニメーション")文字列つき(1つ)
function a_juggle1(charSS1){
	var nextUrl = "juggle.html?siteswap1=" + charSS1;
	document.write("<font size=2><a href=" + nextUrl + ">アニメーション</a></font>");
}

//アニメーションページへのリンク("アニメーション")文字列つき(直接接続)
function a_juggle2(charSS1,charSS2){
	var nextUrl = "juggle.html?siteswap1=" + charSS1 + "&siteswap2=" + charSS2;
	document.write("<font size=2><a href=" + nextUrl + ">アニメーション</a></font>");
}

//アニメーションページへのリンク("アニメーション")文字列つき(糊つき接続)
function a_juggle3(charSS1,charTrans,charSS2){
	var nextUrl = "juggle.html?siteswap1=" + charSS1 + "&trans=" + charTrans + "&siteswap2=" + charSS2;
	document.write("<font size=2><a href=" + nextUrl + ">アニメーション</a></font>");
}

//アニメーションページへのリンク(アニメーションの種類に応じて表示)
function a_juggleX(){
	var nextUrl ="http://murashi1124.hp.infoseek.co.jp/juggle.html";
	switch(SSdata["p"]){
		case 1:		//通常入力時
			nextUrl +=("?siteswap1=" + SSdata["siteswap1"]);
			break;				
		case 3:		//直接接続時
			nextUrl +=("?siteswap1=" + SSdata["siteswap1"]);
			nextUrl +=("&siteswap2=" + SSdata["siteswap2"]);
			break;
		case 4:		//糊つき接続時
			nextUrl +=("?siteswap1=" + SSdata["siteswap1"]);
			nextUrl +=("&trans="     + SSdata["trans"]);
			nextUrl +=("&siteswap2=" + SSdata["siteswap2"]);
			break;
		case 7:		//ランダムアニメーション時
			nextUrl +=("?mode=r");
			nextUrl +=("&n=" + SSdata["n"]);
			nextUrl +=("&m=" + SSdata["m"]);
			break;
		default:
			break;
	}
	document.write("<font size=2><a href=" + nextUrl + " target='_blank'>jump</a></font>");
}

//埋め込みページへのリンク
function a_embedX(){
	var nextURL ="http://murashi1124.hp.infoseek.co.jp/embed.html";
	switch(SSdata["p"]){
		case 1:		//通常入力時
			nextURL +=("?siteswap1=" + SSdata["siteswap1"]);
			break;				
		case 3:		//直接接続時
			nextURL +=("?siteswap1=" + SSdata["siteswap1"]);
			nextURL +=("&siteswap2=" + SSdata["siteswap2"]);
			break;
		case 4:		//糊つき接続時
			nextURL +=("?siteswap1=" + SSdata["siteswap1"]);
			nextURL +=("&trans="     + SSdata["trans"]);
			nextURL +=("&siteswap2=" + SSdata["siteswap2"]);
			break;
		case 7:		//ランダムアニメーション時
			nextURL +=("?mode=r");
			nextURL +=("&n=" + SSdata["n"]);
			nextURL +=("&m=" + SSdata["m"]);
			break;
		default:
			break;
	}
	return(nextURL);
}

//アニメーションページへのURLを生成する(相対パス)
//aLink = falseなら、解析リンクを非表示にする
function makeAnimationURL(aLink){
	var nextUrl ="juggle.html";
	switch(SSdata["p"]){
		case 1:		//通常入力時
			nextUrl +=("?siteswap1=" + SSdata["siteswap1"]);
			if(!aLink) nextUrl += "&a=off";
			break;				
		case 3:		//直接接続時
			nextUrl +=("?siteswap1=" + SSdata["siteswap1"]);
			nextUrl +=("&siteswap2=" + SSdata["siteswap2"]);
			if(!aLink) nextUrl += "&a=off";
			break;
		case 4:		//糊つき接続時
			nextUrl +=("?siteswap1=" + SSdata["siteswap1"]);
			nextUrl +=("&trans="     + SSdata["trans"]);
			nextUrl +=("&siteswap2=" + SSdata["siteswap2"]);
			if(!aLink) nextUrl += "&a=off";
			break;
		case 7:		//ランダムアニメーション時
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

//0～n-1までの乱数を生成する
function rand(n){
	var r = Math.floor( Math.random() * n );
	return(r);
}

//状態数stateの、ボールの個数(2進数に変換したときの1の数)を求める
//stateは0以上の整数とする
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

//状態数stateから、thの高さで投げた後の状態数を返す
//遷移不可能なら-1を返す
function transferState(state,th){
	var nextState = (state + a_(th))/2;	
	//次状態が非整数なら遷移不可
	if(nextState!=Math.floor(nextState)) return(-1);
	//前後の状態でボールの個数が変化していたら遷移不可
	if( calcBallNumByState(state) != calcBallNumByState(nextState) ) return(-1);
	return(nextState);
}

//ジャグリング可能性を判定
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

//ジャグリング可能性を判定(文字列)
function charJuggleCheck(charSS){
	var intSS = toEval(charSS);
	return( juggleCheck(intSS) );
}

//前後の状態数と糊から、遷移可能かをチェック
//state1,2は正しい状態数(0以上、ボール個数一致)であることを前提とする
function transCheck(state1,intTrans,state2){
	var i;
	var lt = intTrans.length;
	//のりに従って状態を遷移させる
	for(i=0; i<lt; i++){
		state1 = transferState(state1,intTrans[i]);
		if(state1 == -1) return(false);				//途中で遷移不可になったら接続不可とみなす
	}
	if(state1 == state2) return(true);
	else return(false);
}

//直接接続可能かチェック(ジャグリング可能かの判定を含む)
function transCheck2(intSS1,intSS2){
	var jugglable1 = juggleCheck(intSS1);
	var jugglable2 = juggleCheck(intSS2);
	var state1 = calcState(intSS1);
	var state2 = calcState(intSS2);
	if(jugglable1 && jugglable2 && state1==state2) return(true);
	else return(false);
}

//糊つき接続可能かチェック(ジャグリング可能かの判定を含む)
function transCheck3(intSS1,intTrans,intSS2){
	var jugglable1 = juggleCheck(intSS1);
	var jugglable2 = juggleCheck(intSS2);
	var state1 = calcState(intSS1);
	var state2 = calcState(intSS2);
	var ballNum1 = calcBallNum(intSS1);
	var ballNum2 = calcBallNum(intSS2);	
	var transable = true;		//接続の可、不可が入る
	//前後のサイトスワップがジャグリング不可か、ボール数が違えば接続は必ず不可
	if(ballNum1 != ballNum2 || !jugglable1 || !jugglable2){
		transable = false;
	}else{
		transable = transCheck(state1,intTrans,state2);		//遷移可能かチェック
	}		
	return(transable);
}

//SSの最小値を返す(SSの長さが0なら35を返す)
function calcSSMin(intSS){
	var i,min = 35;
	for(i=0;i<intSS.length;i++){
		if(intSS[i]<min) min = intSS[i];
	}
	return(min);
}

//SSの最大値を返す(SSの長さが0なら0を返す)
function calcSSMax(intSS){
	var i,max = 0;
	for(i=0;i<intSS.length;i++){
		if(intSS[i]>max) max = intSS[i];
	}
	return(max);
}

//SSの最大値を返す2(SSの長さが0なら0を返す)
function calcSSMax2(intSS1,intSS2){
	var max1 = calcSSMax(intSS1);
	var max2 = calcSSMax(intSS2);
	if(max1>max2) return(max1);
	else return(max2);
}

//SSの最大値を返す3(SSの長さが0なら0を返す)
function calcSSMax3(intSS1,intSS2,intSS3){
	var max1_2 = calcSSMax2(intSS1,intSS2);
	var max3 = calcSSMax(intSS3);
	if(max1_2>max3) return(max1_2);
	else return(max3);
}

//ボールの個数を返す
function calcBallNum(intSS){
	var i,n = 0;
	for(i=0;i<intSS.length;i++) n += intSS[i];
	n /= intSS.length;
	return n;
}

//状態数を2進数に変換する
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

//周期的なサイトスワップの状態数を計算
function calcState(intSS){
	var i,r=0;
	for(i=0;i<intSS.length;i++) r += Math.pow(2,i)* a_(intSS[i]);
	r /= a_(intSS.length);
	//特定の値のときに整数にならない問題に対処するために四捨五入
	r = Math.round(r);
	return(r);
}

//アルファベット1文字を数字に変換(0→0,1→1,…,a→10,b→11…)
//ブランクワード(*)→-1
function alpha2eval(input){
	var a;
	var c = input.charAt(0);
	if(c=="*"){
		a = -1;
	}else{	//通常のアルファベット
		a = input.charCodeAt(0);
		if(a<=57) a-=48;			//0は48に対応
		else a-=87; 				//aは97に対応
	}
	return(a);
}

//与えられたサイトスワップ文字列を数字に変換し、配列に格納して返す
function toEval(charSS){
	var charSS=charSS.toLowerCase();		//小文字に変換
	var i;
	var intSS = new Array(charSS.length);
	for(i=0; i<charSS.length; i++){
		intSS[i] = alpha2eval(charSS.charAt(i));
	}
	return(intSS);
}

//指定されたメッセージを表示
function dispMessage(message){
	document.getElementById("messageArea").innerHTML = 
	'<p><font color=red>' + message + '</font></p>';
}

//入力チェック
//1:通常入力、2:*付、-1:禁止文字あり、-2:null文字、-3:空文字、-4:*が9個以上、-5:*が6個以上
function inputCheck(input){
	if(input == null) return(-2);		//nullの場合
	if(input.length==0) return(-3);		//空文字の場合
	var reg = RegExp("^[0-9a-zA-Z]*$");
	var reg2 = RegExp("^[0-9a-zA-Z*]*$");
	if (input.match(reg)) {
	    return(1);			//入力OK
	} else if(input.match(reg2)){	
		var i,astaNum=0;
		for(i=0;i<input.length;i++) if( input.charAt(i)=="*" ) astaNum++;
		if(astaNum>9) return(-4);			//*が多すぎる場合はエラー
		else if(astaNum>6) return(-5);
		else return(2);						//入力OK *付き
	} else {
	    return(-1);			//禁止文字
	}
}

//URLの引数を取得するクラス
function getHikisuu(){
     getHikisuu.data = new Array();
     getHikisuu.string = location.search.substring(1);		//?をサプレス
     getHikisuu.string = getHikisuu.string.split('&');
     for(var i = 0; i != getHikisuu.string.length; i++) {
         getHikisuu.data[ck_shikibetushi(getHikisuu.string[i].split('=')[0])] 
                               =  Escape(unescape(getHikisuu.string[i].split('=')[1]));
     }
     function ck_shikibetushi(shiki){ //識別子（プロパティ）の命名チェック
         shiki_TOP = shiki.substring(0,1);
         if(shiki_TOP.match(/[a-zA-Z_$]/g) == null){
            return null;
         }
         else if(shiki.match(/[^a-zA-Z0-9_$]/g) != null){
            return null;
         } 
         return shiki;
     }
     function Escape(str){ //文字参照へ変換 
          str = str.replace( /\&/g, '&amp;' );
          str = str.replace( /</g, '&lt;' ); 
          str = str.replace( />/g, '&gt;' ); 
          str = str.replace( /\"/g, '&quot;' );
          str = str.replace( /\'/g, '&#39;' );
          return str;
    }
}

//URLを解析し、必要なパラメータは連想配列に格納して返す
//1:通常入力、2:*付、3:直接接続、4:糊つき接続、5:*付接続、6:最短接続検索、7:ランダムアニメーション表示
//0:何もなし、-1:禁止文字あり、-4:*付(多すぎ)
function analyzeURL(){
	//URL解析
	new getHikisuu();	
	var siteswap1 = getHikisuu.data.siteswap1;
	var trans     = getHikisuu.data.trans;
	var siteswap2 = getHikisuu.data.siteswap2;
	var mode      = getHikisuu.data.mode;
	var n         = getHikisuu.data.n;
	var m         = getHikisuu.data.m;
	var a         = getHikisuu.data.a;

	//1:通常入力、2:*付、-1:禁止文字あり、-2:null文字、-3:空文字
	//-4:*が9個以上、-5:*が6個以上	
	var check1    = inputCheck(siteswap1);		//SS(前半)
	var checkt    = inputCheck(trans);			//SS(接続)
	var check2    = inputCheck(siteswap2);		//SS(後半)
	var checkmode = inputCheck(mode);			//モード
	var checkn    = inputCheck(n);				//ボールの個数
	var checkm    = inputCheck(m);				//高さの最大値
	var p;

	//禁則文字が1つでもあったら表示エラー
	if(check1==-1 || checkt==-1 || check2==-1 || checkmode==-1){
		p=-1;
	}
	//ランダムアニメーション表示
	else if(mode=="r"){
		p=7;
		var flag_n = false,flag_m = false;
		//ボール個数にエラー文字列があった場合は個数3とする
		if(checkn!=1){
			flag_n = true;
		}else{
			n = "" + parseInt(n);
			//ボール個数は数値(アルファベットを含まない)である必要がある
			if(n=="NaN") flag_n = true;
		}
		//最大高さにエラー文字列があった場合は最大値7とする
		if(checkm!=1){
			flag_m = true;
		}else{
			m = "" + parseInt(m);
			//最大高さは数値(アルファベットを含まない)必要がある
			if(m=="NaN") flag_m = true;
		}
		//個数、高さともにエラーの場合は固定値を設定
		if(flag_n && flag_m){
			n="3";
			m="7";
		}
		//個数のみエラーの場合は個数は3(ただし高さ2以下なら高さと同じ)
		else if(flag_n && !flag_m){
			if( parseInt(m)<=2 ){
				n=m;
			}else{
				n="3";
			}
		}
		//高さのみエラーの場合は高さは個数+4(ただしその結果が36以上なら35)
		else if(!flag_n && flag_m){
			m = parseInt(n) + 4 + "";
			if( parseInt(m)>35 ){
				m="35";
			}
		}
	}
	//入力が1つもなかった場合
	else if(check1==-2 && checkt==-2 && check2==-2){
		p=0;
	}
	//糊つき接続
	else if(check1==1 && checkt==1 && check2==1){
		p=4;
	}
	//*つき接続
	else if(check1==1 && checkt==2 && check2==1){
		p=5;	//あとで5に変える
	}
	//*つき接続だが*が多すぎる
	else if(check1==1 && checkt==-5 && check2==1){
		p=-4;
	}	
	//最短接続検索
	else if(check1==1 && checkt==-3 && check2==1){	
		p=3;	//あとで6に変える
	}
	//直接接続
	else if(check1==1 && checkt==-2 && check2==1){
		p=3;
	}
	//通常入力
	else if(check1==1){
		p=1;
	}
	//*付
	else if(check1==2){
		p=2;
	}
	//*が多すぎた場合
	else if(check1==-4){
		p=-4;
	}
	//*付で、糊部分としては多いが通常ブランク検索には問題ない場合
	else if(check1==-5){
		p=2;
	}
	else{
		p=0;
	}

	//入力欄の表示数を制御(値が空でも、パラメータさえあれば入力欄を表示する)
	var inputAreaNum;
	if(check1!=-2 && checkt!=-2 && check2!=-2)	inputAreaNum = 3;
	else if(check1!=-2 && check2!=-2)			inputAreaNum = 2;
	else if(check1!=-2)							inputAreaNum = 1;
	else										inputAreaNum = 1;

	//null値があった場合は空文字に変換しておく
	if(siteswap1 == null) 	siteswap1 = "";
	if(trans == null)		trans = "";
	if(siteswap2 == null) 	siteswap2 = "";	

	//"アニメーション表示の際に、「解析」リンクを出さない"フラグ
	if(a=="off") a = true;
	else a = false;

	//タイトルを設定する
	var title ="";
	if(p==1 || p==2) title = siteswap1 + " :";
	else if(p==3)    title = siteswap1 + "-" + siteswap2 + " :";
	else if(p==4 || p==5)    title = siteswap1 + "-" + trans + "-" + siteswap2 + " :";
	else if(p==7) title = "ランダム(" + n +"ball,max" + m +") :";
	title += "サイトスワップ解析onWEB";

	//データ格納
	var SSdata = new Object();				//連想配列定義
	SSdata["siteswap1"]		= siteswap1;
	SSdata["trans"]			= trans;
	SSdata["siteswap2"]		= siteswap2;
	SSdata["p"]				= p;			//表示状態を定義
	SSdata["inputAreaNum"]	= inputAreaNum;
	SSdata["n"]				= n;
	SSdata["m"]				= m;
	SSdata["title"]			= title;
	SSdata["analyzeOff"]	= a;

	return(SSdata);
}

//配列aの中で0が入っている部分からランダムに1箇所選んでインデックスを返す
//nは上限( a={1,1,0,1,0,0,1,0,0}、n=7なら、0～6の中で0のものから1つ選ぶ(2,4,5のどれか)
//      index 0,1,2,3,4,5,6,7,8…
function randomArrayIndex(a,n){
	var idx = new Array();
	var count,i,j = min2(n,a.length);
	//インデックスを格納する配列を作成、候補の個数を計算
	count = 0;
	for(i=0;i<j;i++){
		if(a[i]==0){
			idx[count]=i;
			count++
		}
	}
	//ランダムに1つ選んで返却
	if(count==0) return(-1);		//候補がなかった場合は-1を返す
	else return(idx[rand(count)]);
}

//配列aの中で0が入っている部分からランダムに1箇所選んでインデックスを返す
//ただし、それまでに出てくる1の個数が少ないほど高確率で選ばれる
function randomArrayIndexLessZero(a,n){
	var idx = new Array(),weight= new Array();
	var count,i,j = min2(n,a.length),k;
	//インデックスを格納する配列を作成、候補の個数を計算
	count = 0;	//0の個数
	k = 1;		//それまでに出てきた1の個数
	for(i=0;i<j;i++){
		if(a[i]==0){
			idx[count]=i;
			weight[count]=1/(k*k*k*k);	//1の個数が少ないほど大きな数にするために逆数をとる
			count++
		}else{
			k++;
		}
	}
	//ランダムに1つ選んで返却
	if(count==0) return(-1);		//候補がなかった場合は-1を返す
	else return( idx[calcRandomWeightArray(weight)] );
}

//SS、状態(配列)を受け取り、次の1手を生成、
//SSは末尾に次の1手を追加、状態は更新する。maxは高さの最大値
function calcRandomNextSS(ss,state,max){
	var next;
	var throwFlag = state[0];
	//状態遷移(1つ左シフトして先頭を切り捨て)
	state.shift();
	state.push(0);
	
	//状態の先頭が0なら、次の1手は0(投げない)
	if(throwFlag==0){
		next = 0;
	}else{
		//次の1手を定める
		if(lessZeroFlag){
			//ゼロを少なくする
			next = randomArrayIndexLessZero(state,max) +1;
		}else{
			//全て均等な確率で生成
			next = randomArrayIndex(state,max) +1;
		}
		//状態を更新
		state[next-1] = 1;
	}
	//次の1手をSSの末尾に追加
	ss.push(next);
}

//配列を受け取り、その中身の比率でランダムにインデックスを返す
//{2,1,3,2,2}なら、2が返る確率が一番高い
//{0,1,2,3,4}
function calcRandomWeightArray(array){
	var i,sum=0,x=0,idx;
	//合計値を計算
	for(i=0;i<array.length;i++) sum += array[i];
	//0～1までの乱数を生成
	var r=Math.random();
	//確率を正規化して加算、境目を計算してindexを返す
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

//1つのサイトスワップ情報を格納するクラス
var SS = function(stringSS){
	//コンストラクタ
	this.str = stringSS;

	//ボール位置を調整
	this.test = function(){
		alert(this.x);
	}
}
