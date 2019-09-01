//主要パラメータ宣言(大域)

var SSdata;					// URLの解析結果など、ページ表示に必要な初期情報を格納するデータ

var oParent ;				// 親オブジェクト(body)
var a_n;					// 高さnに応じた加速度
var c = 40;					// 高さの基準になる定数(SSが3→高さは3c)
var m = 0.3;				// 高さの増加度を表す(m=0→高さとSSが比例)
var a_hold = -0.25;			// 保持のときの加速度(基本固定)
var s = 30;					// 1ビートあたりのステップ数
var dt;						// 時間の増分(スピード、スムーズさに影響)
var holdWidth = 110;		// ボールの保持幅
var holdHeight =15;			// ボールの保持高さ(キャッチ地点と投げ地点の差)
var handWidth = 20;			// 左右の手の間隔(投げ地点同士)
var xBase = 0;				// 左手キャッチ位置x座標(基準点)
var yBase = 0;				// 左手キャッチ位置y座標(基準点)
var T = 0;					// 1ビート内での経過時間
var transTimer = 0;			// 遷移状態を示すタイマー
var forwardable = false;	// forwardボタンを押せるかを設定するフラグ
var forwardLock  = true;	// forwardボタンのロックフラグ(排他制御に使う)
var transableCount;			// forwardボタンを押せるようになるためのタイマー(最初の投げ中は押せない)
var nowState;				// 現在の遷移状態(1:遷移前,2:糊途中,3:遷移後)
var stateBeforeCount;		// 何ステップ後に次の状態に移るか
var transIndex;				// 接続の何番目を見ているか(色を変えるのに使う)
var motionable;				// アニメーション表示が可能か
var changeBallBySS;			// ボールの柄を今投げているSSにするフラグ
var lessZeroFlag;			// ランダムアニメーション表示時にゼロを少なくするフラグ
var embedFlag;				// 表示中ページが埋め込み用であることを示すフラグ
var embedZoom = 0.4;		// 埋め込み時の拡大率
var defaultBall = 4;		// デフォルトのボール色
var defaultHead = 2;		// デフォルトの頭種類

var intSS;					// サイトスワップ(引数渡しが不可なので大域で)
var intSSx1;				// int型SS(大域)
var intTrans;				// int型接続(大域)
var intSSx2;				// int型SS(大域)
var charSSx1;				// 文字型サイトスワップ(引数渡しが不可なので大域で)
var charTrans;				// 文字型接続部分
var charSSx2;				// 文字型サイトスワップ後半

var binaryState;			//ランダムアニメーション表示の際の状態を2進数で格納
var randMaxHeight;			//ランダムアニメーション表示の際の最大高さ
var randSSLength = 10;		//ランダムSSを1段にいくつまで生成するか
var randSSdispIndex;		//ランダムSSを表示するためのindex(実際の処理には使わない)

var SSindex;				// サイトスワップの何番目を見ているか
var balls;					// 各ボール
var timer = 0;				// タイマー
var loadImageTimer;			// 画像読み込みに用いるタイマー
var pauseFlag;				// 再生状態を記録するフラグ(true:停止中、false:再生中)
var startDistance = 30;		// 開始時のボールの、手からの距離
var LeftHand;				// 左手
var RightHand;				// 右手
var dummyImageX;			// 右手の一番右に配置されるダミーイメージ
var dummyImageY;			// 手の位置の一番下に配置されるダミーイメージ
var head;					// 頭
var headToHand = 90;		// 手と頭の距離(正確には手と顎の距離)

var browserHeightMax = 520;	// ブラウザ縦幅の最大値(これを超える場合は縮小される)
//var handWidthMin = 15;	// 手の間隔の最小値(これより手の幅は小さくならない)
var holdWidthMin = 25;		// 保持幅の最小値(これよりボールの保持幅は小さくならない)
var smallRangeX = 1;		// 縮小率(x座標)
var smallRangeY = 1;		// 縮小率(y座標)
var smallRangeHeadY = 1;	// 縮小率(y座標、頭)
var upSpace = 40;			// ブラウザ最上部とボールの一番高い位置の間の間隔
var leftSpace = 122;		// ブラウザ最左部とボールの左端(xBaseで指定した座標)の間の間隔
var baseLine;				// 表示画像の最下部(手の位置)の座標
var handDiffX;				// 座標微調整(画像サイズによらず手の中心とボールの中心を合わせる)ための値
var handDiffY;				// (手の位置からhandDiffX,handDiffYを引く)
var handHoldSync = 0.15;	// ボールをどれくらいの深さで持つか(大きい方が深く持つ)

var ballImageSize = 27;		// ボールの画像サイズ
var ballImageSizeMin = 6;	// ボールサイズの下限
var handImageWidth = 42;	// 手のサイズ(横幅)
var handImageHeight = 47;	// 手のサイズ(縦幅)
// 手のサイズの下限(横幅) ボールサイズの下限と縮尺を統一
var handImageWidthMin = handImageWidth*ballImageSizeMin/ballImageSize;
// 手のサイズの下限(縦幅) ボールサイズの下限と縮尺を統一
var handImageHeightMin = handImageHeight*ballImageSizeMin/ballImageSize;
var nowBallSize;			// 今のボールサイズ(サイズをセットしなおすため大域に)
var nowHandWidth;			// 今の手のサイズ(横幅)
var nowHandHeight;			// 今の手のサイズ(縦幅)
var nowHeadWidth;			// 今の頭のサイズ(横幅)
var nowHeadHeight;			// 今の頭のサイズ(縦幅)
var headImageWidth;			// 頭画像そのもののサイズ(横幅)
var headImageHeight;		// 頭画像そのもののサイズ(縦幅)

//ボール位置の定義(大域)
var xLC = xBase;								//左手キャッチx
var yLC = yBase;								//左手キャッチy
var xLT = xBase + holdWidth;					//左手スローx
var yLT = yBase + holdHeight;					//左手スローy
var xRC = xBase + holdWidth*2 + handWidth;		//右手キャッチx
var yRC = yBase;								//右手キャッチy
var xRT = xBase + holdWidth + handWidth;		//右手スローx
var yRT = yBase + holdHeight;					//右手スローy

var slideBarObj1 = null;	//スピード変更用スライドバーオブジェクト(大域で持つ必要がある)
var slideBarObj2 = null;	//拡大率変更用スライドバーオブジェクト(大域で持つ必要がある)
var barLineLeftX1 = 40;		//スライドバーの下の線の左座標1(スピード用)
var barLineLeftX2 = 40;		//スライドバーの下の線の左座標2(縮尺用)
var offsetX;				//スライドバーの位置とマウス位置の差分

//拡大率の基準値(最大SSから計算され、拡大率変更の基準になる)
var zoom;					//縮尺
var smallRangeXBasis;		//手、ボール、頭の座標縮尺(X)
var smallRangeYBasis;		//手、ボールの座標縮尺(Y)
var smallRangeHeadYBasis;	//頭の座標縮尺(Y)
var nowBallSizeBasis;		//ボールのサイズ
var nowHandWidthBasis;		//手のサイズ(横幅)
var nowHandHeightBasis;		//手のサイズ(縦幅)
var nowHeadWidthBasis;		//頭のサイズ(横幅)
var nowHeadHeightBasis;		//頭のサイズ(縦幅)
var baseLineBasis;			//一番下の座標

//ページ開始時に行われる初期設定
function setPageStatus(){
	SSdata = analyzeURL();		//URLを解析
	setSpeed();					//現在のスピードをクッキーから取得してセット
	setLessZeroFlag();			//現在のアニメーション方法をクッキーから取得してセット

	//埋め込み時とそれ以外で設定が異なる部分
	if(embedFlag){
		//埋め込み用の場合
		zoom = embedZoom;		//拡大率を固定値で設定
		pauseFlag = false;		//一時停止状態は固定で偽
		barLineLeftX1 -= 7;		//スピード変更スライドバーの位置を調整
	}else{
		//埋め込み用以外の場合
		setZoom();				//現在の拡大率をクッキーから取得してセット
		setPauseFlag();			//現在の一時停止状態をクッキーから取得してセット
	}
}

//初期設定
//a_nは、サイトスワップ上でnのとき(滞空時間ではなく)の加速度
function setAcceleration(){
	//加速度を初期設定
	var i,t,h,j;
	a_n = new Array(36);
	a_n[0] = 0;
	a_n[1] = 0.12;				//高さ1の場合は例外
	a_n[2] = 0.15;				//高さ2の場合は例外
	j = 0;
	for(i=3;i<=35;i++){
		t = s*(i-1)/2;			//頂点に到達する際の時間
		h = i*c + j*m*c;		//頂点の高さ
		j+=(i-2);
		a_n[i] = h*2/(t*t);		//高さiで投げる際の加速度	
	}
}

//SSを投げるときの高さを返す
function calcHeight(SS){
	var i,j=0,h;
	if(SS==0 || SS==2) return(0);	//0,2のときは高さ0
	if(SS==1){						//1のときはaに基づいて高さを計算
		h = a_n[1]*s*s/8;
		return(h);
	}
	for(i=3;i<=SS;i++){
		h = i*c + j*m*c;		//頂点の高さ
		j+=(i-2);
	}	
	return(h);
}

//1つのボール情報を格納するクラス
var aBall = function(ballId){
	//コンストラクタ
	this.ballId = ballId;								//ボールID:0～35
	this.x = 0;											//現在位置(x座標)
	this.y = 0;											//現在位置(y座標)
	this.x0 = 0;										//開始位置(x座標)
	this.y0 = 0;										//開始位置(y座標)
	this.t = 0;											//投げ始めてからのステップ数
	this.v0 = 0;										//初速(y)
	this.vx = 0;										//速度(x)
	this.a = 0;											//加速度(投げるときは+,保持のときは-)
	this.nowSS;											//今投げているSS
	this.count = 0;										//残りカウント(2以上:投げ中、1:保持に移る、0:次の投げに移る)
	this.holdFlag = false;								//次が2のときの保持状態であることを示す
	this.catchHand = "";								//次に受け取る手("LC","LT","RT","RC")のどれか
	this.times = 0;
	this.Image = new Image();							//画像オブジェクト
	this.Image.style.position = "absolute";				//絶対配置モード

	//ボール位置を調整
	this.adjustPlace = function(){
		this.x = this.x*smallRangeX + leftSpace;
		this.y = -this.y*smallRangeY + baseLine;
	}

	//座標をセット
	this.setPlace = function(x,y){
		this.x = x;
		this.y = y;
		this.x0 = x;
		this.y0 = y;
		this.adjustPlace();
		this.Image.style.left = this.x;			//表示座標を設定
		this.Image.style.top  = this.y;			//表示座標を設定		
	}
	
	//(x0,y0)～(x1,y1)に向かって放物運動させるための初期設定、滞空時間はnビート
	//p=1:投げ,p=-1:保持
	this.setThrowStatus = function(x0,y0,x1,y1,n,p){
		if(p==1) this.a = a_n[n+1];					//加速度設定(nビート滞空ならばSSはn+1)		
		else this.a = a_hold;						//保持の場合は加速度a_hold(負)を使用
		this.setPlace(x0,y0);						//座標セット
		this.v0 = (y1-y0)/(s*n) + this.a*s*n/2;		//初速(y軸方向)
		this.vx = (x1-x0)/(s*n);					//速度(x軸方向)
		this.t = 0;									//動作時間をリセット
	}

	//サイトスワップの高さを受け取って、初期値をセットする
	//0の入力は想定しない
	this.setThrowHeight = function(SS){
		this.count = SS;		//投げカウントをセット
		this.times = 0;			//投げ始めてからの経過時間
		this.nowSS = SS;		//今投げているSSをセット
		if(this.catchHand == "LT"){			//左手から投げるとき			
			if(SS==1) 		 {this.setThrowStatus(xLT,yLT,xRT,yRT,1,1);		this.catchHand = "RT";}	//キャッチしたら即座に投げ
//			else if(SS==2)	 {this.setNoMove(2);							this.catchHand = "LT";}	//投げ位置でボールを固定(取りやめ中)
			else if(SS==2)	 {this.setThrowStatus(xLT,yLT,xLC,yLC,1,1);		this.catchHand = "LC";}	//持ったままキャッチ位置へ運ぶ
			else if(SS%2==1) {this.setThrowStatus(xLT,yLT,xRC,yRC,SS-1,1);	this.catchHand = "RC";}	//奇数のときは反対の手へ
			else			 {this.setThrowStatus(xLT,yLT,xLC,yLC,SS-1,1);	this.catchHand = "LC";}	//偶数のときはセルフ
		}else{					//右手から投げるとき
			if(SS==1) 		 {this.setThrowStatus(xRT,yRT,xLT,yLT,1,1);		this.catchHand = "LT";}	//キャッチしたら即座に投げ
//			else if(SS==2)	 {this.setNoMove(2);							this.catchHand = "RT";}	//投げ位置でボールを固定(取りやめ中)
			else if(SS==2)	 {this.setThrowStatus(xRT,yRT,xRC,yRC,1,1);		this.catchHand = "RC";}	//持ったままキャッチ位置へ運ぶ
			else if(SS%2==1) {this.setThrowStatus(xRT,yRT,xLC,yLC,SS-1,1);	this.catchHand = "LC";}	//奇数のときは反対の手へ
			else			 {this.setThrowStatus(xRT,yRT,xRC,yRC,SS-1,1);	this.catchHand = "RC";}	//偶数のときはセルフ
		}
	}

	//保持するための初期値をセットする
	this.setHoldHeight = function(){
		if(this.catchHand=="LC")		{this.setThrowStatus(xLC,yLC,xLT,yLT,1,-1);		this.catchHand = "LT";}
		else if(this.catchHand=="LT")	{this.setNoMove(1);								this.catchHand = "LT";}
		else if(this.catchHand=="RC")	{this.setThrowStatus(xRC,yRC,xRT,yRT,1,-1);		this.catchHand = "RT";}
		else if(this.catchHand=="RT")	{this.setNoMove(1);								this.catchHand = "RT";}
	}

	//投げず、保持もしない(nビート後に投げられるようにキャッチの位置でボールキープ)
	this.setNoMove = function(n){
		this.count=n;
		this.v0 = this.vx = this.a = 0;			//全ての速度は0
		if(this.catchHand=="LC")		this.setPlace(xLC,yLC);
		else if(this.catchHand=="LT")	this.setPlace(xLT,yLT);
		else if(this.catchHand=="RC")	this.setPlace(xRC,yRC);
		else if(this.catchHand=="RT")	this.setPlace(xRT,yRT);
	}

	//投げ始めの初期位置にボールをセット
	//最初の1ビートは、1番最初に投げるボールを保持するのに使う
	//2つ目以降のボールは手から離れた位置に置いておく
	this.setStartPosition = function(n,hand){
		this.count=n+1;			//最初に投げるボール:保持状態、として始める
		this.v0 = this.a = 0;
		this.times = 0;			//投げ始めてからの経過時間
		if(hand==1){			//左手から投げるとき
			this.catchHand = "LC";
			if(n==0){							//その後すぐ投げる場合は保持位置にセット
				this.setPlace(xLC,yLC);
			}else{
				this.setPlace(xLC-startDistance,yLC);
				this.vx = startDistance/(s*n);
				this.t = 0;
			}
		}else{					//右手から投げるとき
			this.catchHand = "RC";
			if(n==0){
				this.setPlace(xRC,yRC);			//その後すぐ投げる場合は保持位置にセット
			}else{
				this.setPlace(xRC+startDistance,yRC);
				this.vx = -startDistance/(s*n);
				this.t = 0;
			}
		}
	}

	//位置を更新(時間が進む)
	this.updatePlace = function(){
		this.t+=dt;
		this.x = this.x0 + this.vx*this.t;
		this.y = this.y0 + this.v0*this.t - this.a*this.t*this.t/2;
		if(this.y<yBase && this.a>0) this.y = yBase;	//ボールが手より下に表示されるのを防ぐ
		this.adjustPlace();								//座標を変換
		this.Image.style.left = this.x;
		this.Image.style.top  = this.y;
	}
	
	//位置を再セット(時間は進まない)
	this.renewPlace = function(){
		this.x = this.x0 + this.vx*this.t;
		this.y = this.y0 + this.v0*this.t - this.a*this.t*this.t/2;	
		this.adjustPlace();
		this.Image.style.left = this.x;
		this.Image.style.top  = this.y;
	}
}

//1つの手の情報を格納するクラス
//hand=1:左手、hand=-1:右手
var aHand = function(hand){
	this.x = 0;											//現在位置(x座標)
	this.y = 0;											//現在位置(y座標)
	this.x0 = 0;										//開始位置(x座標)
	this.y0 = 0;										//開始位置(y座標)
	this.t = 0;											//投げ始めてからのステップ数
	this.v0 = 0;										//初速(y)
	this.vx = 0;										//速度(x)
	this.a = 0;											//加速度(投げるときは+,保持のときは-)
	this.catchHand = "";								//次の移動先("C","T")のどちらか
	this.waitFlag = 0;									//待機フラグ(これが立っている間はキャッチ位置で保持)

	this.hand = hand;
	this.Image = new Image();										//画像オブジェクト
	if(this.hand == 1)	this.Image.src = "image/LeftHand.png";		//左手
	else				this.Image.src = "image/RightHand.png";		//右手
	this.Image.style.position = "absolute";							//絶対配置モード

	//手の位置を定義
	if(hand == 1){			//左手
		this.xC = xLC;
		this.yC = yLC;
		this.xT = xLT;
		this.yT = yLT;
	}else{					//右手
		this.xC = xRC;
		this.yC = yRC;
		this.xT = xRT;
		this.yT = yRT;	
	}

	//手の位置を調整
	this.adjustPlace = function(){
		this.x = this.x*smallRangeX + leftSpace - handDiffX;
		this.y = -this.y*smallRangeY + baseLine - handDiffY;
	}

	//座標をセット
	this.setPlace = function(x,y){
		this.x = x;
		this.y = y;
		this.x0 = x;
		this.y0 = y;
		this.adjustPlace();
		this.Image.style.left = this.x;			//表示座標を設定
		this.Image.style.top  = this.y;			//表示座標を設定		
	}
	
	//(x0,y0)～(x1,y1)に向かって放物運動させるための初期設定、滞空時間は1ビートで固定
	//p=1:手が空(凸),p=-1:保持(凹)
	this.setThrowStatus = function(x0,y0,x1,y1,p){
		if(p==1) this.a = a_n[2];					//加速度設定(ボールの加速度(2)と同じ)		
		else this.a = a_hold;						//保持の場合は加速度a_hold(負)を使用
		this.setPlace(x0,y0);						//座標セット
		this.v0 = (y1-y0)/s + this.a*s/2;			//初速(y軸方向)
		this.vx = (x1-x0)/s;						//速度(x軸方向)
		this.t = 0;									//動作時間をリセット
	}	

	//手を移動させるための初期値セット(投げ位置からキャッチ位置へ)
	this.setHandThrow2Catch = function(){
		this.setThrowStatus(this.xT,this.yT,this.xC,this.yC,1);
		this.catchHand = "C";										//移動先
	}

	//手を移動させるための初期値セット(キャッチ位置から投げ位置へ)
	this.setHandCatch2Throw = function(){
		this.setThrowStatus(this.xC,this.yC,this.xT,this.yT,-1);
		this.catchHand = "T";										//移動先
	}

	//投げず、保持もしない(キャッチの位置でボールキープ)
	this.setNoMove = function(){
		if(this.waitFlag>0){				//既に待機状態に入っていた場合
			this.waitFlag--;
		}else{								//新規に待機状態に入った場合
			this.waitFlag = 1;				//待機状態であることを示すフラグ
			this.v0 = this.vx = this.a = 0;			//全ての速度は0
			this.setPlace(this.xC,this.yC);
			this.catchHand = "C";
		}
	}

	//位置を更新(時間が進む)
	this.updatePlace = function(){
		this.t+=dt;
		this.x = this.x0 + this.vx*this.t;
		this.y = this.y0 + this.v0*this.t - this.a*this.t*this.t/2;	
		this.adjustPlace();
		this.Image.style.left = this.x;
		this.Image.style.top  = this.y;
	}

	//位置を再セット(時間は進まない)
	this.renewPlace = function(){
		this.x = this.x0 + this.vx*this.t;
		this.y = this.y0 + this.v0*this.t - this.a*this.t*this.t/2;	
		this.adjustPlace();
		this.Image.style.left = this.x;
		this.Image.style.top  = this.y;
	}
}

//状態数から、各ボールが何番目に投げられるか(1があるのは何桁目か)を返す
//シャワー(51):状態数11(10進)→1011(2進)→
//throw[0]=0,throw[1]=1,throw[2]=3
function calcThrowTiming(state){
	var b = calcBinary(state);
	var i,j=0;
	var throwTiming = new Array();
	for(i=0;i<b.length;i++){
		if(b[i]==1){
			throwTiming[j]=i;
			j++;
		}
	}
	return(throwTiming);
}

//状態数とSSから、各ボールは、最初にどの高さで投げるかを返す
//シャワー(51):状態数11(10進)→1011(2進)→1101(反転)
//1101		1があるところのSSを順に返す
//5151…	f[0]=5,f[1]=1,f[2]=1
function calcFirstHeight(SS,state){
	var b = calcBinary(state);	//状態数(2進)
	var i,j=0,k=0;
	var firstHeight = new Array();
	for(i=0;i<b.length;i++){
		//状態数に1が立っていた場合	
		if(b[i]==1){
			firstHeight[j] = SS[k];	//j番目のボールは高さSS[k]で投げる
			j++;
		}
		k=(k+1)%SS.length;
	}
	return(firstHeight);
}

//ページが読み込まれたときに呼ばれる関数
function loadPage(id_body){
}

//SSとindexを受け取って、index番目だけの色を変えた文字列を返す
function colorIndexString(charSS, index){
	var charSSa = charSS.substring(0,index);
	var charSSb = charSS.charAt(index);
	var charSSc = charSS.substring(index+1,charSS.length);
	
	var colorString = "<h3 style='display:inline;'>" + charSSa
					+ "<font color=red>" + charSSb + "</font>"
					+ charSSc + "</h3>";
	return(colorString);
}

//nowStateに応じて色を変えた文字列を返す
function colorIndexString2(){
	var charSSa,charSSb,charSSc;
	var tmpIndex;
	var colorString = "<h3 style='display:inline;'>";

	if(nowState==1){	//遷移前だった場合
		tmpIndex = SSindex%(charSSx1.length);
		charSSa = charSSx1.substring(0,tmpIndex);
		charSSb = charSSx1.charAt(tmpIndex);
		charSSc = charSSx1.substring(tmpIndex+1,charSSx1.length);
		colorString += ( charSSa + "<font color=red>" + charSSb + "</font>" + charSSc);
	}else{
		colorString += ( charSSx1 );
	}
	colorString += "-";

	if(SSdata["p"]==4){	
		if(nowState==2){	//糊途中だった場合
			charSSa = charTrans.substring(0,transIndex);
			charSSb = charTrans.charAt(transIndex);
			charSSc = charTrans.substring(transIndex+1,charTrans.length);
			colorString += ( charSSa + "<font color=red>" + charSSb + "</font>" + charSSc + "-");		
			transIndex++;
		}else{
			colorString += (charTrans + "-");
		}
	}

	if(nowState==3){		//遷移後だった場合
		tmpIndex = SSindex%(charSSx2.length);
		charSSa = charSSx2.substring(0,tmpIndex);
		charSSb = charSSx2.charAt(tmpIndex);
		charSSc = charSSx2.substring(tmpIndex+1,charSSx2.length);
		colorString += ( charSSa + "<font color=red>" + charSSb + "</font>" + charSSc);
	}else{
		colorString += ( charSSx2 );
	}
	return(colorString);
}

//SS文字列を解析、index番目を赤くして返す(1段目)
function colorIndexString3_1(charSS, index){
	//1段目と2段目を分ける
	var charSSnow  = charSS.substring(0,randSSLength);
	//1段目をさらに3つに分割
	var charSSa = charSSnow.substring(0,index);
	var charSSb = charSSnow.charAt(index);
	var charSSc = charSSnow.substring(index+1,charSS.length);
	var colorString = "<h3 style='display:inline;'>"
					+ charSSa
					+ "<font color=red>" + charSSb + "</font>"
					+ charSSc
					+ "</font>" + "</h3>";
	return(colorString);
}

//SS文字列を解析して返す(2段目)
function colorIndexString3_2(charSS){
	//1段目と2段目を分ける
	var charSSnext = charSS.substring(randSSLength,randSSLength*2);
	//1段目をさらに3つに分割
	var colorString = "<h3 style='display:inline;'>"
					+ "<font color=gray>" + charSSnext + "</font>" + "</h3>";
	return(colorString);
}

//ボール、手の次ステータスを更新
function setNextStatus(){
	var i;
	var nextSS1 = intSS[(SSindex+1)%intSS.length];	//1つ先のSS

	//全ボールの次ステータスを設定
	for(i=0;i<balls.length;i++){
		//2ではないが、次が2であるため例外的に止まっていた場合
		if(balls[i].holdFlag){
			//SSによりボール柄を変更するフラグが立っていた場合はボール色変更
			if(changeBallBySS){
				balls[i].Image.src = "image/ball_ss02.png";
				balls[i].Image.width = nowBallSize;		//サイズ設定
				balls[i].Image.height = nowBallSize;
			}
			balls[i].holdFlag = false;
		}
		//「投げ」の場合
		if(balls[i].count==0){
			balls[i].setThrowHeight(intSS[SSindex]);	//次に投げるボールをセット
			//SSによりボール柄を変更するフラグが立っていた場合はボール色変更
			if(changeBallBySS){
				balls[i].Image.src = (balls[i].nowSS<10) ?
					"image/ball_ss" + "0" + balls[i].nowSS + ".png" :
					"image/ball_ss" + balls[i].nowSS + ".png" ;
				balls[i].Image.width = nowBallSize;		//サイズ設定
				balls[i].Image.height = nowBallSize;					
			}
		}
		//「保持」の場合
		else if(balls[i].count==1){
			//次が"2"なら、保持状態に入らずキャッチ位置で止める
			if(nextSS1==2){
			 	balls[i].setNoMove(3);
				balls[i].holdFlag = true;	//1ビート後に"2"に移ることを示すフラグ
			}
			else balls[i].setHoldHeight();	//次に保持するボールをセット
		}
	}
	//手の次ステータスを設定
	if(LeftHand.catchHand=="C"){
		if(LeftHand.waitFlag>0) LeftHand.setNoMove();
		else{
			//次が0か2ならキャッチ位置で手をキープ
			//ただし、その前に1を受け取る必要がある場合はキープしない
			if((nextSS1==0 || nextSS1==2)&&intSS[SSindex]!=1) {LeftHand.setNoMove();}
			else											  {LeftHand.setHandCatch2Throw();}
		}
	}else{
		LeftHand.setHandThrow2Catch();
	}
	if(RightHand.catchHand=="C"){
		if(RightHand.waitFlag>0) RightHand.setNoMove();
		else{
			//次が0か2ならキャッチ位置で手をキープ
			//ただし、その前に1を受け取る必要がある場合はキープしない			
			if((nextSS1==0 || nextSS1==2)&&intSS[SSindex]!=1) {RightHand.setNoMove();}
			else											  {RightHand.setHandCatch2Throw();}
		}
	}else{
		RightHand.setHandThrow2Catch();
	}
}

//ボールごとに経過時間を加算、ズレ調整処理
function tuneBalls(){
	var i;
	for(i=0;i<balls.length;i++) {
		balls[i].count--;				//各ボールの残りカウントを減らす
		balls[i].times++;				//各ボールの経過時間を増やす
		balls[i].t = balls[i].times*s;	//Tとtのズレを軽減するため、ボールごとの経過時間をリセット
	}
}

function moveBalls(){
	var i;
	//ビート開始地点だった場合
	if(T==0){
		setNextStatus();									//ボール、手の次ステータスを計算
		SSindex = (SSindex+1)%intSS.length;					//インデックスを進める		
	}
	for(i=0;i<balls.length;i++) balls[i].updatePlace();		//全ボールの情報をアップデート
	LeftHand.updatePlace();									//左手の情報をアップデート
	RightHand.updatePlace();								//右手の情報をアップデート
	
	//時間を進める
	T+=dt;
	
	//1ビートが終了した場合
	if(T>=s){
		//次に投げるSSの色を変える
		document.getElementById("ssArea1").innerHTML = colorIndexString(charSSx1,SSindex);
		//ボールごとの微調整
		tuneBalls();
		T=0;								//ビートをリセット
	}	
}

function moveBalls2(){
	var i;
	//ビート開始地点だった場合
	if(T==0){
		forwardLock = true;									//次へボタンを押せなくする
		setNextStatus();									//ボール、手の次ステータスを計算
		SSindex = (SSindex+1)%intSS.length;					//インデックスを進める		
		forwardLock = false;								//次へボタンのロック解除
	}
	for(i=0;i<balls.length;i++) balls[i].updatePlace();		//全ボールの情報をアップデート
	LeftHand.updatePlace();									//左手の情報をアップデート
	RightHand.updatePlace();								//右手の情報をアップデート
	
	//時間を進める
	T+=dt;
	
	//1ビートが終了した場合
	if(T>=s){
		forwardLock = true;					//次へボタンを押せなくする		
		//全てのボールを一度投げるまでは遷移不可にするための処理
		if(transableCount>=1){
			transableCount--;
			if(transableCount==0){
				forwardable = true;
				document.images["forwardButton"].src="image/btn_forward.png";
			}
		}
		//遷移フラグが立っていた場合
		if(transTimer>0){
			stateBeforeCount--;
			if(stateBeforeCount==0){
				nowState=2;			//状態を「糊中」に変更
				transIndex=0;		//糊中のindexを設定
			}
			transTimer--;			//フラグ減算
			if(transTimer==0){		//後半の投げに移る
				intSS = copyArray(intSSx2);
				SSindex = 0;
				nowState=3;			//状態を「遷移中」に変更
			}
		}
		//次に投げるSSの色を変える
		document.getElementById("ssArea1").innerHTML = colorIndexString2();
		//ボールごとの微調整
		tuneBalls();
		T=0;								//ビートをリセット
		forwardLock = false;				//次へボタンのロック解除
	}	
}

//ランダムに投げる場合
function moveBalls3(){
	var i;
	//ビート開始地点だった場合
	if(T==0){
		setNextStatus();									//ボール、手の次ステータスを計算
		calcRandomNextSS(intSS,binaryState,randMaxHeight);
		intSS.shift();
	}
	for(i=0;i<balls.length;i++) balls[i].updatePlace();		//全ボールの情報をアップデート
	LeftHand.updatePlace();									//左手の情報をアップデート
	RightHand.updatePlace();								//右手の情報をアップデート

	//時間を進める
	T+=dt;

	//1ビートが終了した場合	
	if(T>=s){
		//次に投げるSSの色を変える(常に先頭に着色)
		document.getElementById("ssArea1").innerHTML = colorIndexString3_1(charSSx1,randSSdispIndex);
		document.getElementById("ssArea2").innerHTML = colorIndexString3_2(charSSx1);		
		//SS(文字列)に、決定している最後のintSSを追加
		charSSx1 += ch[intSS[randSSLength*2]];
		
		randSSdispIndex++;
		//表示SSの段落を変更する処理
		if(randSSdispIndex == randSSLength){
			//今まで上段だった部分を一気に切り捨てる
			charSSx1 = charSSx1.substring(randSSLength,randSSLength*3);
			randSSdispIndex = 0;
		}
		
		//ボールごとの微調整
		tuneBalls();
		T=0;								//ビートをリセット
	}		
}


//高さの最大値を元に縮尺をセット
function setReducedScale(maxHeight){
	//y座標縮尺設定
	//ボールの最大高さ、頭位置(手と顎の距離+頭の長さ)のうち大きい方
	var topPos = max2(maxHeight,headToHand+headImageHeight);
	if(topPos > browserHeightMax) {
		smallRangeY = browserHeightMax/maxHeight;	//縮小率(高さがbrowserHeightMaxに収まるように調整)
		baseLine = browserHeightMax + upSpace;		//ベースライン(一番下の座標)
	}else{
		baseLine = topPos + upSpace;
	}
	//x座標縮尺設定
	smallRangeX = smallRangeY;
	if(holdWidth*smallRangeX<holdWidthMin){			//ボール保持幅の最小値を下回る場合は、
		smallRangeX = holdWidthMin/holdWidth;		//保持幅が最小値と等しくなるように倍率設定
	}
	//決定した縮尺を拡大率の基準値として保存
	smallRangeXBasis = smallRangeX;
	smallRangeYBasis = smallRangeY;
	baseLineBasis = baseLine;
}

//頭の位置をセット
function setHeadPlace(head){
	head.style.left = (xLC + xRC)/2 + ballImageSize/2 - headImageWidth/2;
	head.style.top = yBase + headToHand + headImageHeight;
	return(head);
}

//頭の位置を調整
function adjustHeadPlace(head){
	var x = parseInt(head.style.left);
	var y = parseInt(head.style.top);
	x = x*smallRangeX + leftSpace;
	y = -y*smallRangeHeadY + baseLine;
	head.style.left = x;
	head.style.top = y;
	return(head);
}

//拡大率、今の画像サイズを定義
function defineZoom(){
	//基準値を、クッキーからセットした倍率に基づいて拡大縮小
	smallRangeX = smallRangeXBasis * zoom;		//手、ボールの座標縮尺(X)
	smallRangeY = smallRangeYBasis * zoom;		//手、ボールの座標縮尺(Y)
	smallRangeHeadY = smallRangeHeadYBasis * zoom;	//頭の座標縮尺(Y)
	//一番下の座標(ボールの頂点座標を保つため、upSpace(頂点⇔ブラウザトップ間の距離)を除外してから拡大/縮小
	baseLine = (baseLineBasis-upSpace)*zoom + upSpace;
	nowBallSize = nowBallSizeBasis * zoom;		//ボールのサイズ
	nowHandWidth = nowHandWidthBasis * zoom;	//手のサイズ(横幅)
	nowHandHeight = nowHandHeightBasis * zoom;	//手のサイズ(縦幅)
	nowHeadWidth = nowHeadWidthBasis * zoom;
	nowHeadHeight = nowHeadHeightBasis * zoom;
	
	//画像が見えなくなるのを防ぐため、最低でも1ピクセル残るようにする
	if(nowBallSize<1) nowBallSize = 1;
	if(nowHandWidth<1) nowHandWidth = 1;
	if(nowHandHeight<1) nowHandHeight = 1;
	if(nowHeadWidth<1) nowHeadWidth = 1;
	if(nowHeadHeight<1) nowHeadHeight = 1;	

}

//手、頭、ボールの初期設定 + 表示
//高さの最大値、ボールの個数、状態数を受け取る
function setFirstStatus(maxHeight,ballNum,state){
	var i;
	//--------初期設定--------
	oParent = document.getElementById("body1");		//親エレメントを取得
	var throwTiming = calcThrowTiming(state);		//各ボールの、投げ始めのタイミングを計算
	var firstHeight = calcFirstHeight(intSS,state);	//各ボールを最初にどの高さで投げるか計算	

	//頭の画像を取得(位置決めのために頭のサイズが必要なため、先行して取得)
	head = new Image();
	head.style.position = "absolute";
	var headIdx = CookieRead("headIdx");	//クッキーから頭のindexを取り出す
	if(headIdx == "" || headIdx == null) headIdx=defaultHead;		//nullチェック
	setHead(headIdx);
	
	//--------表示サイズ調整--------
	setReducedScale(maxHeight);						//アニメーション全体の縮尺を設定

	//ボールサイズを倍率に応じて縮小		
	if(ballImageSize * smallRangeY < ballImageSizeMin) nowBallSize = ballImageSizeMin;
	else nowBallSize = ballImageSize * smallRangeY;
	//手のサイズを倍率に応じて縮小
	if(handImageWidth * smallRangeY < handImageWidthMin){
		nowHandWidth = handImageWidthMin;
		nowHandHeight = handImageHeightMin;
	}else{
		nowHandWidth = handImageWidth * smallRangeY;
		nowHandHeight = handImageHeight * smallRangeY;
	}

	//頭座標、サイズの縮小率を決定
	//頭の座標は、手のサイズがどれだけ小さくなったかに応じて決まる
	smallRangeHeadY = nowHandWidth/handImageWidth;
	smallRangeHeadYBasis = smallRangeHeadY;
	//頭サイズを決定
	nowHeadWidth = headImageWidth * smallRangeX;
	nowHeadHeight = headImageHeight * smallRangeHeadY;

	//決定した表示サイズを基準値として保存
	nowBallSizeBasis = nowBallSize;
	nowHandWidthBasis = nowHandWidth;
	nowHandHeightBasis = nowHandHeight;
	nowHeadWidthBasis = nowHeadWidth;
	nowHeadHeightBasis = nowHeadHeight;

	//拡大率を決定、拡大率に基づいて画像サイズを計算
	defineZoom();

	//頭を表示
	head = setHeadPlace(head);					//位置をセット
	head = adjustHeadPlace(head);				//位置を調整
	oParent.appendChild(head);
	head.width = nowHeadWidth;					//サイズをセット
	head.height = nowHeadHeight;

	//ボールの中心と手の中心を合わせるための差分を計算
	handDiffX = (nowHandWidth-nowBallSize)/2;
	handDiffY = nowHandHeight * handHoldSync;	

	//ボール用意
	var hand;
	balls = new Array(ballNum);
	for(i=0;i<ballNum;i++){
		balls[i] = new aBall(i);
		if(throwTiming[i]%2==0) hand=-1;					//右手にセット
		else hand=1;										//左手にセット
		balls[i].setStartPosition(throwTiming[i],hand);		//ボールの初期保持位置をセット
		balls[i].nowSS = firstHeight[i];					//最初に投げるSSをセット
	}
	//ボール画像を設定
	var ballColorIdx = CookieRead("ballColorIdx");	//クッキーから色のindexを取り出す
	if(ballColorIdx == "" || ballColorIdx == null) ballColorIdx=defaultBall;	//nullチェック
	setBallColor(ballColorIdx)											//セット

	//画像表示(先に投げるボールを手前に表示するため、逆順で表示
	for(i=ballNum-1;i>=0;i--) {
		oParent.appendChild(balls[i].Image);
		balls[i].Image.width = nowBallSize;		//サイズ設定
		balls[i].Image.height = nowBallSize;
	}
			
	//手を用意、表示(手はボールの手前に表示)
	LeftHand = new aHand(1);		LeftHand.setNoMove();			//左手はキャッチ位置でキープ
	RightHand = new aHand(-1);		RightHand.setPlace(xRC,yRC);
	LeftHand.catchHand = "C";
	RightHand.catchHand = "C";
		
	oParent.appendChild(LeftHand.Image);
	oParent.appendChild(RightHand.Image);
	//サイズ設定
	LeftHand.Image.width = nowHandWidth;
	LeftHand.Image.height = nowHandHeight;
	RightHand.Image.width = nowHandWidth;
	RightHand.Image.height = nowHandHeight;		

	//スクロールバーが動くのを防ぐため、ダミー画像を配置
	setDummyImage();	
	noScroll();
}

//ダミー画像を配置する処理(座標のセットはしない)
function setDummyImage(){
	dummyImageX = new Image();		//右手の一番右
	dummyImageY = new Image();		//手の位置の一番下
	dummyImageX.src = "image/dummy.png";	dummyImageX.style.position = "absolute";	
	dummyImageY.src = "image/dummy.png";	dummyImageY.style.position = "absolute";
	oParent.appendChild(dummyImageX);
	oParent.appendChild(dummyImageY);
}

//ダミー画像の座標をセット
function noScroll(){
	//右手の一番右の画像座標をセット
	var w = xRC*smallRangeX +  xBase + leftSpace + nowHandWidth;
	dummyImageX.style.left = w;				dummyImageX.style.top = 0;	
	//手の位置の一番下の画像座標をセット
//	var h = (-a_hold*s*s/8+handImageHeight)*smallRangeY + yBase + baseLine -handDiffY;
	var h = (-a_hold*s*s/8+handImageHeight)*smallRangeY + yBase + baseLine +nowHandHeight;
	dummyImageY.style.left = 0;				dummyImageY.style.top = h;	
}

//サイトスワップアニメーションを表示する(接続なし)
function dispAnimation(){
	charSSx1 = SSdata["siteswap1"];
	intSS = toEval(charSSx1);								//文字列をintに変換
	motionable = juggleCheck(intSS);						//ジャグリング可能性を判定	
	
	//SSを表示(1段目のみ)
	document.getElementById("ssArea1").innerHTML = 
	"<h3 style='display:inline;'>" + charSSx1 + "</h3>";
	//解析ページへのリンク(埋め込み用の場合、解析ページ非表示フラグ(a=off)が立っていた場合は非表示)
	if(!embedFlag && !SSdata["analyzeOff"]){
		document.getElementById("analyzeLink").innerHTML = a_analyze1(charSSx1);
	}
	
	if(motionable){
		setAcceleration();									//加速度を初期設定
		var maxHeight = calcHeight( calcSSMax(intSS) );		//高さの最大値を決定
		var ballNum = calcBallNum(intSS);					//ボールの個数
		var state = calcState(intSS);						//状態数を計算
		setFirstStatus(maxHeight,ballNum,state);			//高さの設定+初期画像配置
		T=0;												//経過時間をリセット
		SSindex = intSS.length-1;							//インデックスをリセット(最初に1ビート保持があるので末尾にセット)

		//一時停止フラグが立っていなければ、アニメーションをスタート
		if(!pauseFlag){
			timer = setInterval("moveBalls()",10);	
		}
	}else{
		//ジャグリング不可能なとき
		dispMessage("ジャグリング不可");
	}	
}

//サイトスワップアニメーションを表示する(直接接続)
function dispAnimation2(){
	charSSx1 = SSdata["siteswap1"];		intSSx1 = toEval(charSSx1);
	charSSx2 = SSdata["siteswap2"];		intSSx2 = toEval(charSSx2);
	intSS = toEval(charSSx1);

	//接続可能性を判定
	motionable = transCheck2(intSSx1,intSSx2);

	//SSを表示(1段目のみ)
	document.getElementById("ssArea1").innerHTML = 
	"<h3 style='display:inline;'>" + charSSx1 + "-" + charSSx2 + "</h3>";
	//解析ページへのリンク(埋め込み用の場合、解析ページ非表示フラグ(a=off)が立っていた場合は非表示)
	if(!embedFlag && !SSdata["analyzeOff"]){
		document.getElementById("analyzeLink").innerHTML = a_analyze2(charSSx1,charSSx2);
	}
	if(motionable){
		setAcceleration();											//加速度を初期設定	
		var maxHeight = calcHeight( calcSSMax2(intSSx1,intSSx2) );	//高さの最大値を決定
		var ballNum = calcBallNum(intSSx1);
		var state = calcState(intSS);						//状態数を計算
		setFirstStatus(maxHeight,ballNum,state);			//高さの設定+初期画像配置
		T=0;												//経過時間をリセット
		SSindex = intSS.length-1;							//インデックスをリセット(最初に1ビート保持があるので末尾にセット)
		transTimer = 0;
		//forwardボタンを使用不可能にする
		forwardable = false;
		forwardLock = true;	//最初はロックをかけておく
		transableCount = calcBinary( calcState(intSS) ).length;
		nowState = 1;		//状態を「遷移前」にセット
		
		//一時停止フラグが立っていなければ、アニメーションをスタート
		if(!pauseFlag){
			timer = setInterval("moveBalls2()",10);	
		}
	}else{
		//接続不可能なとき
		dispMessage("接続不可");
	}
}

//サイトスワップアニメーションを表示する(糊つき接続)
function dispAnimation3(){
	charSSx1  = SSdata["siteswap1"];	intSSx1  = toEval(charSSx1);
	charSSx2  = SSdata["siteswap2"];	intSSx2  = toEval(charSSx2);
	charTrans = SSdata["trans"];		intTrans = toEval(charTrans);
	intSS = toEval(charSSx1);
	
	//接続可能性を判定
	motionable = transCheck3(intSSx1,intTrans,intSSx2);

	//SSを表示(1段目のみ)
	document.getElementById("ssArea1").innerHTML = 
	"<h3 style='display:inline;'>" + charSSx1 + "-" + charTrans  + "-" + charSSx2 + "</h3>";
	//解析ページへのリンク(埋め込み用の場合、解析ページ非表示フラグ(a=off)が立っていた場合は非表示)
	if(!embedFlag && !SSdata["analyzeOff"]){	
		document.getElementById("analyzeLink").innerHTML = a_analyze3(charSSx1,charTrans,charSSx2);
	}
	if(motionable){
		setAcceleration();													//加速度を初期設定	
		var maxHeight = calcHeight( calcSSMax3(intSSx1,intTrans,intSSx2) );	//高さの最大値を決定	
		var ballNum = calcBallNum(intSSx1);
		var state = calcState(intSS);						//状態数を計算
		setFirstStatus(maxHeight,ballNum,state);			//高さの設定+初期画像配置
		T=0;												//経過時間をリセット
		SSindex = intSS.length-1;							//インデックスをリセット(最初に1ビート保持があるので末尾にセット)
		transTimer = 0;
		//forwardボタンを使用不可能にする
		forwardable = false;
		forwardLock = true;	//最初はロックをかけておく
		transableCount = calcBinary( calcState(intSS) ).length;
		nowState = 1;		//状態を「遷移前」にセット

		//一時停止フラグが立っていなければ、アニメーションをスタート
		if(!pauseFlag){
			timer = setInterval("moveBalls2()",10);
		}
	}else{
		//接続不可能なとき
		dispMessage("接続不可");
	}
}

//サイトスワップアニメーションを表示する(ランダム)
function dispAnimation4(){
	var i;
	//パラメータ取得
	var randBallNum = SSdata["n"];		//ボールの個数
	randMaxHeight = SSdata["m"];	//最大高さ

	//パラメータ判定
	//高さ、ボール個数が数値であることは保障されている
	randBallNum = parseInt(randBallNum);
	randMaxHeight = parseInt(randMaxHeight);
	//高さがボール個数を超えていればジャグリング可能
	if(randBallNum<=35 && randMaxHeight<=35 && randBallNum<=randMaxHeight){
		motionable = true;
	}else{
		motionable = false;
	}

	//解析ページへのリンク(埋め込み用の場合、解析ページ非表示フラグ(a=off)が立っていた場合は非表示)
	if(!embedFlag && !SSdata["analyzeOff"]){
		document.getElementById("analyzeLink").innerHTML = a_analyze1("");
	}
	if(motionable){
		//ランダムサイトスワップの初期状態を生成
		intSS = new Array(1);
		intSS[0] = 0;			//最初の1投用に、先頭にダミー値を入れておく

		//基底からスタートするため、ボール個数分の1を記録
		binaryState = new Array(35);
		for(i=0;i<35;i++){
			if(i<randBallNum) binaryState[i]=1;
			else binaryState[i]=0;
		}
		//初期状態として、一定長のランダムSSを生成
		//(2段表示にするため、randSSLengthの2倍の長さを生成
		for(i=0;i<randSSLength*2;i++) calcRandomNextSS(intSS,binaryState,randMaxHeight);

		//表示用にSS文字列を生成(先頭にはダミーが入っているので消しておく)
		charSSx1 = toChar(intSS);
		charSSx1 = charSSx1.substr(1,randSSLength*2);

		//SSを表示(1段目)
		document.getElementById("ssArea1").innerHTML = colorIndexString3_1(charSSx1,-1);
		//SSを表示(2段目)
		document.getElementById("ssArea2").innerHTML = colorIndexString3_2(charSSx1);

		setAcceleration();								//加速度を初期設定
		var maxHeight = calcHeight(randMaxHeight);		//高さの最大値を決定
		var state = a_(randBallNum);					//状態数
		setFirstStatus(maxHeight,randBallNum,state);	//高さの設定+初期画像配置
		T=0;											//経過時間をリセット
		SSindex = 0;									//インデックスをリセット(最初に1ビート保持があるので末尾にセット)
		randSSdispIndex = 0;							//表示用indexをリセット
		
		//一時停止フラグが立っていなければ、アニメーションをスタート
		if(!pauseFlag){
			timer = setInterval("moveBalls3()",10);
		}
	}else{
		//ジャグリング不可能なとき
		dispMessage("ジャグリング不可");
	}
}

//巻き戻しボタン押下、全ステータスを初期状態に戻す
function rewind(){
	if(!motionable) return(false);
	var i;

	if( SSdata["p"]==1 || SSdata["p"]==3 || SSdata["p"]==4 || SSdata["p"]==7){
		//直接接続があるとき
		if( SSdata["p"]==3 || SSdata["p"]==4 ){
			intSS = copyArray(intSSx1);
			forwardable = false;									//forwardボタンを使用不可能にする
			forwardLock = true;										//最初はロックをかけておく
			transableCount = calcBinary( calcState(intSS) ).length;	//全ボールを投げきるまでは遷移不可
			document.images["forwardButton"].src="image/btn_forward_invalid.png";
		}

		//状態数、ボール個数、インデックスを計算
		var ballNum,state;
		if(SSdata["p"]==7){
			ballNum = parseInt(SSdata["n"]);
			state = a_(ballNum);
			SSindex = 0;					//インデックスをリセット(最初に1ビート保持があるので末尾にセット)
			randSSdispIndex = 0;			//表示用indexをリセット			
		}else{
			ballNum = calcBallNum(intSS);
			state = calcState(intSS);
			SSindex = intSS.length-1;		//インデックスをリセット(最初に1ビート保持があるので末尾にセット)
		}

		//ランダムアニメーションのときの独自処理
		if( SSdata["p"]==7 ){
			//基底からスタートするため、ボール個数分の1を記録
			for(i=0;i<35;i++){
				if(i<ballNum) binaryState[i]=1;
				else binaryState[i]=0;
			}
			intSS = new Array();
			intSS[0] = 0;
			//初期状態として、一定長のランダムSSを生成
			//(2段表示にするため、randSSLengthの2倍の長さを生成
			for(i=0;i<randSSLength*2;i++) calcRandomNextSS(intSS,binaryState,randMaxHeight);
			//表示用にSS文字列を生成(先頭にはダミーが入っているので消しておく)
			charSSx1 = toChar(intSS);
			charSSx1 = charSSx1.substr(1,randSSLength*2);
		}
		
		//SS表示部分をリセット(黒一色に)
		var ssString1;
		var ssString2 = "";
		if(SSdata["p"]==1){
			ssString1 = colorIndexString(charSSx1,-1);
		}
		if(SSdata["p"]==3){
			ssString1 = colorIndexString2();
		}
		if(SSdata["p"]==4){
			ssString1 = colorIndexString2();
		}
		if(SSdata["p"]==7){
			ssString1 = colorIndexString3_1(charSSx1,-1);
			ssString2 = colorIndexString3_2(charSSx1);
		}
		document.getElementById("ssArea1").innerHTML = ssString1;
		document.getElementById("ssArea2").innerHTML = ssString2;

		var throwTiming = calcThrowTiming(state);		//各ボールの、投げ始めのタイミングを計算
		var firstHeight = calcFirstHeight(intSS,state);	//各ボールを最初にどの高さで投げるか計算
		//ボール用意
		var hand;
		for(i=0;i<ballNum;i++){
			if(throwTiming[i]%2==0) hand=-1;					//右手にセット
			else hand=1;										//左手にセット
			balls[i].setStartPosition(throwTiming[i],hand);		//ボールの初期保持位置をセット
			balls[i].nowSS = firstHeight[i];					//最初に投げるSSをセット
			balls[i].holdFlag = false;							//次が"2"であることを示すフラグを落とす
		}
		//ボール画像を再設定
		var ballColorIdx = CookieRead("ballColorIdx");	//クッキーから色のindexを取り出す
		if(ballColorIdx == "" || ballColorIdx == null) ballColorIdx=defaultBall;		//nullチェック
		setBallColor(ballColorIdx)											//セット		
		//ボールサイズを改めてセットする(サイズが崩れるのを防止)
		for(i=0; i<balls.length; i++){
			balls[i].Image.width = nowBallSize;		//サイズ設定
			balls[i].Image.height = nowBallSize;
		}
		//手のステータスをリセット
		LeftHand.waitFlag = 0;			RightHand.waitFlag = 0;	
		LeftHand.setNoMove();			RightHand.setPlace(xRC,yRC);
		LeftHand.catchHand = "C";		RightHand.catchHand = "C";
		//時間ステータスをリセット
		nowState = 1;				//状態を「遷移前」にセット
		T=0;						//経過時間をリセット
		transTimer = 0;				//遷移フラグをリセット
	}
	return(false);
}

//一時停止ボタン押下、一時停止or再生
function pauseOrPlay(){
	if(!motionable) return(false);
	if( SSdata["p"]==1 || SSdata["p"]==3 || SSdata["p"]==4 || SSdata["p"]==7 ){
		if(!pauseFlag){
			//再生中だった場合
			document.images["playButton"].src="image/btn_play.png";		//画像を再生ボタンに変更
			clearInterval(timer);										//タイマーをクリア
			pauseFlag=true;
			setCookie("pause",1);										//クッキーに保存
		}else{
			//一時停止中だった場合
			document.images["playButton"].src="image/btn_pause.png";	//画像をポーズボタンに変更
			if(SSdata["p"]==1) timer = setInterval("moveBalls()",10);	//タイマーをセット(接続なし)
			if(SSdata["p"]==3) timer = setInterval("moveBalls2()",10);	//タイマーをセット(直接接続)
			if(SSdata["p"]==4) timer = setInterval("moveBalls2()",10);	//タイマーをセット(糊つき接続)
			if(SSdata["p"]==7) timer = setInterval("moveBalls3()",10);	//タイマーをセット(ランダム)
			pauseFlag=false;
			setCookie("pause",0);										//クッキーに保存
		}
	}
	return(false);
}

//次状態に進む
function forward(){
	if(forwardLock) return(false);		//ロックがかかっている(他操作中,ステータス更新など)
	if(T==0) return(false);				//T=0のときにボタンが押されるとインデックスがズレるので押せなくする
	if(!forwardable) return(false);		//遷移許可がないとき(ボールを投げきっていない、一度forwardを押した、など)
	if( SSdata["p"]!=3 && SSdata["p"]!=4 ) 
		return(false);					//接続表示中ではないとき

	var tmpIndex = (SSindex-1+intSS.length)%(intSS.length);	//今見てるindexの1つ前
	transTimer = intSS.length - tmpIndex;					//transTimer後に後半に遷移開始

	//SSの状態によってうまく投げられない場合への対処
	if(
		(	//条件1(最後から2つ目が"2")
		 ((intSS.length==1 && intSS[0]==2) 				||
		  (intSS.length>=2 && intSS[intSS.length-2]==2))	&&
		 (SSindex!=intSS.length-1 || intSS.length==1)
		)
		||
		(	//条件2(先頭が"2"、糊つき接続)
			SSdata["p"]==4  &&		//糊つき接続
			intSS.length>=3 &&		//長さ2以下は条件1で対応済み
			intSS[0]==2		&&		//先頭が2なら、接続の準備ができない
			intTrans[0]!=2			//接続の先頭が2なら対応不要
		)
		||
		(	//条件3(先頭が"2"、直接接続)
			SSdata["p"]==3  &&		//糊つき接続
			intSS.length>=3 &&		//長さ2以下は条件1で対応済み
			intSS[0]==2		&&		//先頭が2なら、接続の準備ができない
			intSSx2[0]!=2			//後半の先頭が2なら対応不要
		)
	  ){
	     	intSS = intSS.concat(intSS);	//intSSを2回繰り返す
			transTimer += (intSS.length/2);
	}

	//stateBeforeCount後にSS1が終わる
	stateBeforeCount = transTimer;
	
	//糊を合成
	if(SSdata["p"]==4){
		intSS = intSS.concat(intTrans);
		transTimer += intTrans.length;
	}
	if(SSindex==0) SSindex = intSSx1.length%intSS.length;	//indexが0になるのを防止	
	intSS[intSS.length] = intSSx2[0];						//手の動きを合わせるために後ろに追加

	forwardable = false;	//一度遷移したらもう遷移できない
	document.images["forwardButton"].src="image/btn_forward_invalid.png";

	return(false);
}

//値を受け取り、小数第2位まで表示するように変換して返す(文字列)
//1→1.00、1.2→1.20、1.35→1.35
function calc2ndDecimal(a){
	var a2 = a + "";
	//整数なら小数点以下を表示するように変換(1→1.0、2→2.0、3→3.0)
	if(a2.length==1) a2 += ".0";
	//小数点以下1位までなら小数第2位を表示するように変換(1.0→1.00、2.3→2.30)
	if(a2.length==3) a2 += "0";		
	return(a2);
}

//スピードを表示
function dispSpeed(){
	//小数第2位まで表示するように変換
	var tmpDt = calc2ndDecimal(dt);
	document.getElementById("speedArea").innerHTML = 
	'<font color=blue size=2>' + tmpDt + '</font>';
}

//スピードをクッキーから取得して設定
function setSpeed(){
	dt = CookieRead("speed") -0;		//クッキーから取得(0を引いて数値に変換)
	dt = (Math.floor(dt*100+0.5))/100;	//誤差を丸めるために四捨五入
	if(dt<0.05 || dt>3.0)dt = 1.5;		//値が許容範囲を超えていたらデフォルト(1.5)に設定
}

//拡大率を表示
function dispZoom(){
	//小数第2位まで表示するように変換
	var tmpZoom = calc2ndDecimal(zoom);
	document.getElementById("zoomArea").innerHTML = 
	'<font color=blue size=2>' + tmpZoom + '</font>';
}

//拡大率をクッキーから取得して設定
function setZoom(){
	zoom = CookieRead("zoom") -0;		//クッキーから取得(0を引いて数値に変換)
	if(zoom<0.05 || zoom>3.0)zoom = 1.0;	//値が許容範囲を超えていたらデフォルト(1.0)に設定
}

//ボール色を変更する
function setBallColor(ballColorIdx){
	var i;
	//SSによってボール柄を変えるフラグ(一旦落とす)
	changeBallBySS = false;
	
	//そのとき投げているサイトスワップ
	if(ballColorIdx == 0){
		changeBallBySS = true;		//随時画像を切り替えるためのフラグを立てる
		for(i=0; i<balls.length; i++){
			//そのとき投げているSSを取得
			balls[i].Image.src = (balls[i].nowSS<10) ?
				"image/ball_ss" + "0" + balls[i].nowSS + ".png" :
				"image/ball_ss" + balls[i].nowSS + ".png" ;
		}
	}
	//フルカラー文字付き(デフォルト)
	if(ballColorIdx == 1){
		for(i=0; i<balls.length; i++){
			balls[i].Image.src = (i<10) ?
				"image/ball" + "0" + i + ".png" : 
				"image/ball" + i + ".png" ;
		}
	}else
	//フルカラー文字なし
	if(ballColorIdx == 2){
		for(i=0; i<balls.length; i++){
			balls[i].Image.src = (i<10) ?
				"image/ball2_" + "0" + i + ".png" : 
				"image/ball2_" + i + ".png" ;
		}
	}else
	//緑
	if(ballColorIdx == 3){
		for(i=0; i<balls.length; i++) balls[i].Image.src = "image/ball_green.png";
	}else 
	//青
	if(ballColorIdx == 4){
		for(i=0; i<balls.length; i++) balls[i].Image.src = "image/ball_blue.png";
	}else 
	//赤
	if(ballColorIdx == 5){
		for(i=0; i<balls.length; i++) balls[i].Image.src = "image/ball_red.png";
	}else 
	//黄
	if(ballColorIdx == 6){
		for(i=0; i<balls.length; i++) balls[i].Image.src = "image/ball_yellow.png";
	}else 
	//白黒
	if(ballColorIdx == 7){
		for(i=0; i<balls.length; i++){
			if(i%2==0)	balls[i].Image.src = "image/ball_black.png";
			else		balls[i].Image.src = "image/ball_white.png";
		}
	}else 
	//アクア
	if(ballColorIdx == 8){
		for(i=0; i<balls.length; i++){
			balls[i].Image.src = "image/ball_aqua.png";
		}
	}else 	
	//小玉
	if(ballColorIdx == 9){
		for(i=0; i<balls.length; i++){
			balls[i].Image.src = "image/ball_small.png";
		}
	}else 	
	//林檎
	if(ballColorIdx == 10){
		for(i=0; i<balls.length; i++){
			balls[i].Image.src = "image/ball_apple.png";
		}
	}else 
	//蜜柑
	if(ballColorIdx == 11){
		for(i=0; i<balls.length; i++) balls[i].Image.src = "image/ball_orange.png";
	}else 
	//もやっと
	if(ballColorIdx == 12){
		for(i=0; i<balls.length; i++) balls[i].Image.src = "image/ball_moya.png";
	}else
	//顔
	if(ballColorIdx == 13){
		var j;
		for(i=0; i<balls.length; i++){
			j=rand(12);
			balls[i].Image.src = (j<10) ?
				"image/ball_face" + "0" + j + ".png" : 
				"image/ball_face" + j + ".png" ;
		}	
	}else
	//ドラゴンボール
	if(ballColorIdx == 14){
		var j;
		for(i=0; i<balls.length; i++){
			j = (i%7)+1;
			balls[i].Image.src = "image/ball_db" + j + ".png";
		}
	}	
}

//コンボボックスが変更されたとき、ボールの種類を変更
function changeBallColor(){
	//フォームから選択されたボール種別のインデックスを取得
	var selectedBallColorIdx = document.animationForm.ballColor.selectedIndex; 
	//クッキーに保存する
	setCookie("ballColorIdx",selectedBallColorIdx);
	
	//アニメーション表示ができているときのみ色変更処理実施
	if(motionable){
		//ボール色変更処理
		setBallColor(selectedBallColorIdx);
		//ボールサイズを改めてセットする(サイズが崩れるのを防止)
		var i;
		for(i=0; i<balls.length; i++){
			balls[i].Image.width = nowBallSize;		//サイズ設定
			balls[i].Image.height = nowBallSize;
		}
	}
	return(false);
}

//ボール色を変更するコンボボックス
function dispBallColorComboBox(){
	//色データを定義
	ballColorData = new Array(14);	
	ballColorData[0] = "SS";
	ballColorData[1] = "フル1";
	ballColorData[2] = "フル2";
	ballColorData[3] = "緑";
	ballColorData[4] = "青";
	ballColorData[5] = "赤";
	ballColorData[6] = "黄";
	ballColorData[7] = "白黒";
	ballColorData[8] = "アクア";
	ballColorData[9] = "小玉";
	ballColorData[10] = "林檎";
	ballColorData[11] = "蜜柑";
	ballColorData[12] = "もや";	
	ballColorData[13] = "顔";
	ballColorData[14] = "DB";
	//初期値を設定
	var n = CookieRead("ballColorIdx");	//クッキーから色のindexを取り出す
	if(n == "" || n == null) n=defaultBall;		//nullチェック
	//コンボボックス表示
	var i;
	document.write("<select name=ballColor style='font-size:9pt;' onChange='changeBallColor()'>");
		for(i=0;i<ballColorData.length;i++){
			document.write("<option value='" + i + "'");
			if(n == i) {
				document.write(" selected");		//初期値があった場合は選択状態にする
			}
			document.write(">" + ballColorData[i] +"</option>");
		}
	document.write("</select>");
}

//頭をセット
function setHead(headIdx){
	//頭表示なし
	if(headIdx == 0){
		head.src = "image/head_off.png";
		headImageWidth  = 1;
		headImageHeight = 63;
	}else
	//通常の頭
	if(headIdx == 1){
		head.src = "image/head_normal.png";
		headImageWidth  = 63;
		headImageHeight = 63;
	}else
	//シルクハット
	if(headIdx == 2){
		head.src = "image/head_hat1.png";
		headImageWidth  = 85;
		headImageHeight = 85;
	}else
	//サングラス
	if(headIdx == 3){
		head.src = "image/head_glass.png";
		headImageWidth  = 65;
		headImageHeight = 63;
	}else	
	//悪魔
	if(headIdx == 4){
		head.src = "image/head_devil.png";
		headImageWidth  = 111;
		headImageHeight = 81;
	}
}

//頭の種類を変更
function changeHead(){
	//フォームから選択された頭種別のインデックスを取得
	var selectedHeadIdx = document.animationForm.head.selectedIndex; 
	//クッキーに保存する
	setCookie("headIdx",selectedHeadIdx);
	//アニメーション表示ができているときのみ頭変更処理実施
	if(motionable){
		//頭の種類変更処理
		setHead(selectedHeadIdx);
		//頭の位置を再セット
		head = setHeadPlace(head);
		head = adjustHeadPlace(head);
		//頭サイズを再セット
		nowHeadWidthBasis = headImageWidth * smallRangeXBasis;
		nowHeadHeightBasis = headImageHeight * smallRangeHeadYBasis;
		nowHeadWidth = nowHeadWidthBasis * zoom;
		nowHeadHeight = nowHeadHeightBasis * zoom;
		//画像が見えなくなるのを防ぐため、最低でも1ピクセル残るようにする
		if(nowHeadWidth<1) nowHeadWidth = 1;
		if(nowHeadHeight<1) nowHeadHeight = 1;
		head.width = nowHeadWidth;
		head.height = nowHeadHeight;
	}
	return(false);
}

//頭の種類を変更するコンボボックス
function dispHeadComboBox(){
	//頭データを定義
	headData = new Array(5);
	headData[0] = "OFF";
	headData[1] = "Normal";
	headData[2] = "Hat";
	headData[3] = "Glass";	
	headData[4] = "Devil";
	//初期値を設定
	var n = CookieRead("headIdx");	//クッキーから頭のindexを取り出す
	if(n == "" || n == null) n=defaultHead;		//nullチェック
	//コンボボックス表示
	var i;
	document.write("<select name=head style='font-size:9pt;' onChange='changeHead()'>");
		for(i=0;i<headData.length;i++){
			document.write("<option value='" + i + "'");
			if(n == i) document.write(" selected");		//初期値があった場合は選択状態にする
			document.write(">" + headData[i] +"</option>");
		}
	document.write("</select>");
}

//ゼロフラグをクッキーから取得してセット
function setLessZeroFlag(){
	//クッキーから状態を取得
	var a = parseInt(CookieRead("lessZero"));
	if(a==1) lessZeroFlag = true;
	else lessZeroFlag = false;
}

//ランダムアニメーション表示アルゴリズムを変える
function changeRandomAnimationState(obj){
	//ゼロを少なくするフラグをチェックボックスから取得
	lessZeroFlag = obj.checked;
	//クッキーにセット
	if(lessZeroFlag) setCookie("lessZero",1);
	else setCookie("lessZero",0);
}

//ランダムアニメーション表示時に0を少なくするためのチェックボックス
function dispLessZeroCheckBox(){
	//チェックボックスを表示
	document.write("<input type='checkbox' name='lessZero' value='' ");
	document.write("onClick='changeRandomAnimationState(this)' ");
	if(lessZeroFlag) document.write('checked');
	document.write('>');
	document.write("<font size='2'>0を減らす</font>");
}

//スライドバーの準備
function readySlideBar(){

	//----共通処理-----
	//画面内でマウスが動いたときの処理を定義
	document.onmousemove = onMouseMove;
	//画面内でマウスがあがったときの処理を定義
	document.onmouseup = onMouseUp;

	//----スピード変更スライドバー関連----
	//スライドバー下線のx座標をセット(定義はソース冒頭)
	document.getElementById("barline1").style.left = barLineLeftX1;
	//スライドバーの位置をセット
	//下線の左端+ (20dt-1) ※dt=x/20+0.05なので
	document.getElementById("slidebar1").style.left = barLineLeftX1 + dt*20 -1;
	//スライドバー上でマウスが押されたときの処理を定義
	document.getElementById("slidebar1").onmousedown = onMouseDownOnSlideBar1;
	//下線上でクリックされたときの処理を定義
	document.getElementById("barline1").onmousedown = onClickBarLine1;

	//埋め込み時は拡大率を変更しない
	if(!embedFlag){
		//----拡大率変更スライドバー関連
		//スライドバー下線のx座標をセット(定義はソース冒頭)
		document.getElementById("barline2").style.left = barLineLeftX2;
		//スライドバーの位置をセット
		//下線の左端+ (20zoom-1) ※zoom=x/20+0.05なので
		document.getElementById("slidebar2").style.left = barLineLeftX2 + zoom*20 -1;
		//スライドバー上でマウスが押されたときの処理を定義
		document.getElementById("slidebar2").onmousedown = onMouseDownOnSlideBar2;	
		//下線上でクリックされたときの処理を定義
		document.getElementById("barline2").onmousedown = onClickBarLine2;
	}
}

//画面内でマウスが動いたときにスライドバーの位置を更新、速度を計算
function onMouseMove(e){
	//スライドバーオブジェクトがある(スピード変更スライドバー上でマウスが押されている)とき
	if(slideBarObj1){
		//スライドバーの新しいx座標(マウス位置-オフセット値)を計算
		var slideBarX;
		if(document.all) {	//IE系のとき
			slideBarX = event.clientX - offsetX + document.body.scrollLeft;
		}else{				//Fx系のとき
			slideBarX = e.pageX - offsetX;
		}
		//スライドバー移動
		moveSlideBar1(slideBarX);
		return false;
	}
	//スライドバーオブジェクトがある(縮尺変更スライドバー上でマウスが押されている)とき	
	else if(slideBarObj2){
		//スライドバーの新しいx座標(マウス位置-オフセット値)を計算
		var slideBarX;
		if(document.all) {	//IE系のとき
			slideBarX = event.clientX - offsetX + document.body.scrollLeft;
		}else{				//Fx系のとき
			slideBarX = e.pageX - offsetX;
		}
		//スライドバー移動
		moveSlideBar2(slideBarX);
		return false;
	}
	//スライドバーオブジェクトがないときは何もしない
	else return true;
}

//画面内でマウスがあがったときにスライドバーを開放する(移動対象ではないとみなす)
function onMouseUp(){
	slideBarObj1 = null;		//スピード変更終了
	slideBarObj2 = null;		//拡大率変更終了	
	setCookie("speed",dt);		//速度をクッキーにセット
	//埋め込み時は拡大率を保存しない
	if(!embedFlag){
		setCookie("zoom",zoom);		//拡大率をクッキーにセット
	}
}

//スピード変更用スライドバーの上でマウスボタンが押されたときに
//スライドバー移動モードに入る
function onMouseDownOnSlideBar1(e){
	//スライドバーオブジェクトをセット(定義はソース冒頭)
	slideBarObj1 = document.getElementById("slidebar1");

	//マウス位置と画像の左端位置の差分を取得しておく
	if(document.all){	//IE系のとき
		offsetX = event.offsetX + 2;
	}
	else{				//Fx系のとき
		offsetX = e.pageX - parseInt(slideBarObj1.style.left);
	}
	return false;
}

//拡大率変更用スライドバーの上でマウスボタンが押されたときに
//スライドバー移動モードに入る
function onMouseDownOnSlideBar2(e){
	//スライドバーオブジェクトをセット(定義はソース冒頭)
	slideBarObj2 = document.getElementById("slidebar2");

	//マウス位置と画像の左端位置の差分を取得しておく
	if(document.all){	//IE系のとき
		offsetX = event.offsetX + 2;
	}
	else{				//Fx系のとき
		offsetX = e.pageX - parseInt(slideBarObj2.style.left);
	}
	return false;
}

//スライドバーの線上でクリックされた場合、バーをそこに移動
function onClickBarLine1(e){	
	//クリック位置(絶対座標)を計算(動きを自然に見せるために少し引いておく)
	var slideBarX;
	if(document.all) {	//IE系のとき
		slideBarX = event.clientX + document.body.scrollLeft-4;
	}else{				//Fx系のとき
		slideBarX = e.pageX-2;
	}

	//そのままスライドバー移動に入れるようにオブジェクトをセットしておく
	slideBarObj1 = document.getElementById("slidebar1");
	offsetX = 2;

	//スライドバー移動
	moveSlideBar1(slideBarX);
	return false;
}

//スライドバーの線上でクリックされた場合、バーをそこに移動
function onClickBarLine2(e){	
	//クリック位置(絶対座標)を計算(動きを自然に見せるために少し引いておく)
	var slideBarX;
	if(document.all) {	//IE系のとき
		slideBarX = event.clientX + document.body.scrollLeft-4;
	}else{				//Fx系のとき
		slideBarX = e.pageX-2;
	}
	//そのままスライドバー移動に入れるようにオブジェクトをセットしておく
	slideBarObj2 = document.getElementById("slidebar2");
	offsetX = 2;
	//スライドバー移動
	moveSlideBar2(slideBarX);
	return false;
}

//スライドバー移動先を受け取り、配置、速度変更を行う
function moveSlideBar1(slideBarX){
	//スライドバーが速度設定範囲外にある場合は範囲内に設定
	if(slideBarX<barLineLeftX1)		slideBarX = barLineLeftX1;
	if(slideBarX>=barLineLeftX1+60)	slideBarX = barLineLeftX1+59;

	document.getElementById("slidebar1").style.left = slideBarX;			//スライドバーの位置を更新
	dt = (slideBarX-barLineLeftX1)/20 + 0.05;		//スライドバー座標と下線の左端の座標から速度計算
	dt = (Math.floor(dt*100+0.5))/100;			//誤差を丸めるために四捨五入	
	dispSpeed();								//速度情報を表示
}

//スライドバー移動先を受け取り、配置、速度変更を行う
function moveSlideBar2(slideBarX){
	//スライドバーが速度設定範囲外にある場合は範囲内に設定
	if(slideBarX<barLineLeftX2)		slideBarX = barLineLeftX2;
	if(slideBarX>=barLineLeftX2+60)	slideBarX = barLineLeftX2+59;

	document.getElementById("slidebar2").style.left = slideBarX;			//スライドバーの位置を更新
	zoom = (slideBarX-barLineLeftX2)/20 + 0.05;	//スライドバー座標と下線の左端の座標から縮尺計算
	zoom = (Math.floor(zoom*100+0.5))/100;			//誤差を丸めるために四捨五入
	dispZoom();								//拡大率を表示
	changeZoom();							//拡大率を変更
}

//縮尺を決定するパラメータを一律拡大/縮小する
function changeZoom(){
	//アニメーション表示ができているときのみ縮尺変更処理実施
	if(motionable){
		//拡大率を決定
		defineZoom();
		//セットしたボールサイズを反映
		for(i=0; i<balls.length; i++){
			balls[i].Image.width = nowBallSize;
			balls[i].Image.height = nowBallSize;
		}	
		//セットした手のサイズを反映
		LeftHand.Image.width = nowHandWidth;
		LeftHand.Image.height = nowHandHeight;
		RightHand.Image.width = nowHandWidth;
		RightHand.Image.height = nowHandHeight;
		
		//セットした頭のサイズを反映
		head.width = nowHeadWidth;
		head.height = nowHeadHeight;
		
		//ボールの中心と手の中心を合わせるための差分を計算
		handDiffX = (nowHandWidth-nowBallSize)/2;
		handDiffY = nowHandHeight * handHoldSync;

		//座標を更新
		for(i=0;i<balls.length;i++) balls[i].renewPlace();		//全ボールの情報をアップデート
		LeftHand.renewPlace();									//左手の情報をアップデート
		RightHand.renewPlace();									//右手の情報をアップデート
		head = setHeadPlace(head);								//頭の座標をセット
		head = adjustHeadPlace(head);							//頭の座標を調整
		//スクロールバーが動くのを防ぐための処理
		noScroll();
	}
}

//拡大率をリセット(1.00にする)
function resetZoom(){
	zoom = 1;
	//スライドバーの位置を更新	
	document.getElementById("slidebar2").style.left = barLineLeftX2 + 20*zoom-1;
	dispZoom();														//拡大率を表示
	changeZoom();													//拡大率を変更
	//拡大率をクッキーにセット
	setCookie("zoom",zoom);
}

//埋め込み時用に、全体を囲む枠のサイズを決定する
function setFrameSize(){
	//ダミーイメージ配置場所(右手の右下の座標)を取得
	var w = parseInt(dummyImageX.style.left);
	//初期投げがはみ出しがちなので気持ち広めにする
	w += 10;
	var h = parseInt(dummyImageY.style.top);
	//枠の縦幅が不要に大きくなるのを防ぐための微調整。値には根拠なし(要調査)
	h -= (40*smallRangeY);
	//調整
	//縦幅は、最低ラインと、絵表示分(h)のうち大きい方を採用
	if(SSdata["p"]==7){
		h = max2(h,188);
	}else{
		h = max2(h,140);
	}

	//枠のサイズを設定
	document.getElementById("flame1").style.width=w;
	document.getElementById("flame1").style.height=h;
}

//埋め込み用HTML(iframe)を生成
function getEnbedHTML(){
	var enbedURL = "";
	var enbedHTML = "";

	//アニメーション表示不可の場合は空文字を返す
	if(!motionable) return "";

	//枠サイズ計算のために、拡大率を埋め込み用のものと仮定した場合の各値を計算
	var tmpSmallRangeX   = smallRangeXBasis * embedZoom;
	var tmpSmallRangeY   = smallRangeYBasis * embedZoom;
	var tmpBaseLine      = (baseLineBasis-upSpace) * embedZoom + upSpace;
	var tmpNowHandWidth  = nowHandWidthBasis * embedZoom;
	var tmpNowHandHeight = nowHandHeightBasis * embedZoom;

	//ダミーイメージ座標の計算方法と同一の方法で横幅、縦幅を計算
	var w = xRC*tmpSmallRangeX + xBase + leftSpace + tmpNowHandWidth;
	//初期投げがはみ出しがちなので気持ち広めにする
	w += 10;
	var h = (-a_hold*s*s/8+handImageHeight)*tmpSmallRangeY + yBase + tmpBaseLine +tmpNowHandHeight;
	//枠の縦幅が不要に大きくなるのを防ぐための微調整。値には根拠なし(要調査)
	h -= (40*tmpSmallRangeY);

	//調整
	//横幅は、SS表示分(w2)と、絵表示分(w)のうち大きい方を採用
	//w2からは「解析」リンク分(44px)を差し引く
	var w2 = document.getElementById("flame1").offsetWidth - 44;
	w = max2(w,w2);
	//縦幅は、最低ラインと、絵表示分(h)のうち大きい方を採用
	if(SSdata["p"]==7){
		h = max2(h,188);
	}else{
		h = max2(h,140);
	}
	//少し多めに幅をとる
	w+=5;
	h+=5;
	//切捨て
	w = Math.floor(w);
	h = Math.floor(h);

	//埋め込み先URLを作成
	enbedURL = a_embedX();
	enbedHTML +=( "<iframe  width='" + w +"' height='" + h +"' ");
	enbedHTML +=( "scrolling='no' " );
	enbedHTML +=( "frameborder='0' " );
	enbedHTML +=( "marginheight='0' " );
	enbedHTML +=( "marginwidth='0' " );
	enbedHTML +=( "src='" + enbedURL + "'>" );
	enbedHTML +=( "</iframe>" );

	return enbedHTML;
}

//埋め込みURL表示エリアにURLを表示
function dispEmbedURL(){
	document.animationForm.embedUrlArea.value = getEnbedHTML();
}

//埋め込みURL表示エリアが選択された際に、中の文字列を全選択状態にする
function embedSelect(){
	document.animationForm.embedUrlArea.focus();
	document.animationForm.embedUrlArea.select();
}

//一時停止状態をクッキーから取得してセット
function setPauseFlag(){
	//クッキーから状態を取得
	var a = parseInt(CookieRead("pause"));
	if(a==1){
		pauseFlag = true;
	}else{
		pauseFlag = false;
	}
}