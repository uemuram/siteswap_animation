//��v�p�����[�^�錾(���)

var SSdata;					// URL�̉�͌��ʂȂǁA�y�[�W�\���ɕK�v�ȏ��������i�[����f�[�^

var oParent ;				// �e�I�u�W�F�N�g(body)
var a_n;					// ����n�ɉ����������x
var c = 40;					// �����̊�ɂȂ�萔(SS��3��������3c)
var m = 0.3;				// �����̑����x��\��(m=0��������SS�����)
var a_hold = -0.25;			// �ێ��̂Ƃ��̉����x(��{�Œ�)
var s = 30;					// 1�r�[�g������̃X�e�b�v��
var dt;						// ���Ԃ̑���(�X�s�[�h�A�X���[�Y���ɉe��)
var holdWidth = 110;		// �{�[���̕ێ���
var holdHeight =15;			// �{�[���̕ێ�����(�L���b�`�n�_�Ɠ����n�_�̍�)
var handWidth = 20;			// ���E�̎�̊Ԋu(�����n�_���m)
var xBase = 0;				// ����L���b�`�ʒux���W(��_)
var yBase = 0;				// ����L���b�`�ʒuy���W(��_)
var T = 0;					// 1�r�[�g���ł̌o�ߎ���
var transTimer = 0;			// �J�ڏ�Ԃ������^�C�}�[
var forwardable = false;	// forward�{�^���������邩��ݒ肷��t���O
var forwardLock  = true;	// forward�{�^���̃��b�N�t���O(�r������Ɏg��)
var transableCount;			// forward�{�^����������悤�ɂȂ邽�߂̃^�C�}�[(�ŏ��̓������͉����Ȃ�)
var nowState;				// ���݂̑J�ڏ��(1:�J�ڑO,2:�Гr��,3:�J�ڌ�)
var stateBeforeCount;		// ���X�e�b�v��Ɏ��̏�ԂɈڂ邩
var transIndex;				// �ڑ��̉��Ԗڂ����Ă��邩(�F��ς���̂Ɏg��)
var motionable;				// �A�j���[�V�����\�����\��
var changeBallBySS;			// �{�[���̕����������Ă���SS�ɂ���t���O
var lessZeroFlag;			// �����_���A�j���[�V�����\�����Ƀ[�������Ȃ�����t���O
var embedFlag;				// �\�����y�[�W�����ߍ��ݗp�ł��邱�Ƃ������t���O
var embedZoom = 0.4;		// ���ߍ��ݎ��̊g�嗦
var defaultBall = 4;		// �f�t�H���g�̃{�[���F
var defaultHead = 2;		// �f�t�H���g�̓����

var intSS;					// �T�C�g�X���b�v(�����n�����s�Ȃ̂ő���)
var intSSx1;				// int�^SS(���)
var intTrans;				// int�^�ڑ�(���)
var intSSx2;				// int�^SS(���)
var charSSx1;				// �����^�T�C�g�X���b�v(�����n�����s�Ȃ̂ő���)
var charTrans;				// �����^�ڑ�����
var charSSx2;				// �����^�T�C�g�X���b�v�㔼

var binaryState;			//�����_���A�j���[�V�����\���̍ۂ̏�Ԃ�2�i���Ŋi�[
var randMaxHeight;			//�����_���A�j���[�V�����\���̍ۂ̍ő卂��
var randSSLength = 10;		//�����_��SS��1�i�ɂ����܂Ő������邩
var randSSdispIndex;		//�����_��SS��\�����邽�߂�index(���ۂ̏����ɂ͎g��Ȃ�)

var SSindex;				// �T�C�g�X���b�v�̉��Ԗڂ����Ă��邩
var balls;					// �e�{�[��
var timer = 0;				// �^�C�}�[
var loadImageTimer;			// �摜�ǂݍ��݂ɗp����^�C�}�[
var pauseFlag;				// �Đ���Ԃ��L�^����t���O(true:��~���Afalse:�Đ���)
var startDistance = 30;		// �J�n���̃{�[���́A�肩��̋���
var LeftHand;				// ����
var RightHand;				// �E��
var dummyImageX;			// �E��̈�ԉE�ɔz�u�����_�~�[�C���[�W
var dummyImageY;			// ��̈ʒu�̈�ԉ��ɔz�u�����_�~�[�C���[�W
var head;					// ��
var headToHand = 90;		// ��Ɠ��̋���(���m�ɂ͎�Ɗ{�̋���)

var browserHeightMax = 520;	// �u���E�U�c���̍ő�l(����𒴂���ꍇ�͏k�������)
//var handWidthMin = 15;	// ��̊Ԋu�̍ŏ��l(�������̕��͏������Ȃ�Ȃ�)
var holdWidthMin = 25;		// �ێ����̍ŏ��l(������{�[���̕ێ����͏������Ȃ�Ȃ�)
var smallRangeX = 1;		// �k����(x���W)
var smallRangeY = 1;		// �k����(y���W)
var smallRangeHeadY = 1;	// �k����(y���W�A��)
var upSpace = 40;			// �u���E�U�ŏ㕔�ƃ{�[���̈�ԍ����ʒu�̊Ԃ̊Ԋu
var leftSpace = 122;		// �u���E�U�ō����ƃ{�[���̍��[(xBase�Ŏw�肵�����W)�̊Ԃ̊Ԋu
var baseLine;				// �\���摜�̍ŉ���(��̈ʒu)�̍��W
var handDiffX;				// ���W������(�摜�T�C�Y�ɂ�炸��̒��S�ƃ{�[���̒��S�����킹��)���߂̒l
var handDiffY;				// (��̈ʒu����handDiffX,handDiffY������)
var handHoldSync = 0.15;	// �{�[�����ǂꂭ�炢�̐[���Ŏ���(�傫�������[������)

var ballImageSize = 27;		// �{�[���̉摜�T�C�Y
var ballImageSizeMin = 6;	// �{�[���T�C�Y�̉���
var handImageWidth = 42;	// ��̃T�C�Y(����)
var handImageHeight = 47;	// ��̃T�C�Y(�c��)
// ��̃T�C�Y�̉���(����) �{�[���T�C�Y�̉����Ək�ڂ𓝈�
var handImageWidthMin = handImageWidth*ballImageSizeMin/ballImageSize;
// ��̃T�C�Y�̉���(�c��) �{�[���T�C�Y�̉����Ək�ڂ𓝈�
var handImageHeightMin = handImageHeight*ballImageSizeMin/ballImageSize;
var nowBallSize;			// ���̃{�[���T�C�Y(�T�C�Y���Z�b�g���Ȃ������ߑ���)
var nowHandWidth;			// ���̎�̃T�C�Y(����)
var nowHandHeight;			// ���̎�̃T�C�Y(�c��)
var nowHeadWidth;			// ���̓��̃T�C�Y(����)
var nowHeadHeight;			// ���̓��̃T�C�Y(�c��)
var headImageWidth;			// ���摜���̂��̂̃T�C�Y(����)
var headImageHeight;		// ���摜���̂��̂̃T�C�Y(�c��)

//�{�[���ʒu�̒�`(���)
var xLC = xBase;								//����L���b�`x
var yLC = yBase;								//����L���b�`y
var xLT = xBase + holdWidth;					//����X���[x
var yLT = yBase + holdHeight;					//����X���[y
var xRC = xBase + holdWidth*2 + handWidth;		//�E��L���b�`x
var yRC = yBase;								//�E��L���b�`y
var xRT = xBase + holdWidth + handWidth;		//�E��X���[x
var yRT = yBase + holdHeight;					//�E��X���[y

var slideBarObj1 = null;	//�X�s�[�h�ύX�p�X���C�h�o�[�I�u�W�F�N�g(���Ŏ��K�v������)
var slideBarObj2 = null;	//�g�嗦�ύX�p�X���C�h�o�[�I�u�W�F�N�g(���Ŏ��K�v������)
var barLineLeftX1 = 40;		//�X���C�h�o�[�̉��̐��̍����W1(�X�s�[�h�p)
var barLineLeftX2 = 40;		//�X���C�h�o�[�̉��̐��̍����W2(�k�ڗp)
var offsetX;				//�X���C�h�o�[�̈ʒu�ƃ}�E�X�ʒu�̍���

//�g�嗦�̊�l(�ő�SS����v�Z����A�g�嗦�ύX�̊�ɂȂ�)
var zoom;					//�k��
var smallRangeXBasis;		//��A�{�[���A���̍��W�k��(X)
var smallRangeYBasis;		//��A�{�[���̍��W�k��(Y)
var smallRangeHeadYBasis;	//���̍��W�k��(Y)
var nowBallSizeBasis;		//�{�[���̃T�C�Y
var nowHandWidthBasis;		//��̃T�C�Y(����)
var nowHandHeightBasis;		//��̃T�C�Y(�c��)
var nowHeadWidthBasis;		//���̃T�C�Y(����)
var nowHeadHeightBasis;		//���̃T�C�Y(�c��)
var baseLineBasis;			//��ԉ��̍��W

//�y�[�W�J�n���ɍs���鏉���ݒ�
function setPageStatus(){
	SSdata = analyzeURL();		//URL�����
	setSpeed();					//���݂̃X�s�[�h���N�b�L�[����擾���ăZ�b�g
	setLessZeroFlag();			//���݂̃A�j���[�V�������@���N�b�L�[����擾���ăZ�b�g

	//���ߍ��ݎ��Ƃ���ȊO�Őݒ肪�قȂ镔��
	if(embedFlag){
		//���ߍ��ݗp�̏ꍇ
		zoom = embedZoom;		//�g�嗦���Œ�l�Őݒ�
		pauseFlag = false;		//�ꎞ��~��Ԃ͌Œ�ŋU
		barLineLeftX1 -= 7;		//�X�s�[�h�ύX�X���C�h�o�[�̈ʒu�𒲐�
	}else{
		//���ߍ��ݗp�ȊO�̏ꍇ
		setZoom();				//���݂̊g�嗦���N�b�L�[����擾���ăZ�b�g
		setPauseFlag();			//���݂̈ꎞ��~��Ԃ��N�b�L�[����擾���ăZ�b�g
	}
}

//�����ݒ�
//a_n�́A�T�C�g�X���b�v���n�̂Ƃ�(�؋󎞊Ԃł͂Ȃ�)�̉����x
function setAcceleration(){
	//�����x�������ݒ�
	var i,t,h,j;
	a_n = new Array(36);
	a_n[0] = 0;
	a_n[1] = 0.12;				//����1�̏ꍇ�͗�O
	a_n[2] = 0.15;				//����2�̏ꍇ�͗�O
	j = 0;
	for(i=3;i<=35;i++){
		t = s*(i-1)/2;			//���_�ɓ��B����ۂ̎���
		h = i*c + j*m*c;		//���_�̍���
		j+=(i-2);
		a_n[i] = h*2/(t*t);		//����i�œ�����ۂ̉����x	
	}
}

//SS�𓊂���Ƃ��̍�����Ԃ�
function calcHeight(SS){
	var i,j=0,h;
	if(SS==0 || SS==2) return(0);	//0,2�̂Ƃ��͍���0
	if(SS==1){						//1�̂Ƃ���a�Ɋ�Â��č������v�Z
		h = a_n[1]*s*s/8;
		return(h);
	}
	for(i=3;i<=SS;i++){
		h = i*c + j*m*c;		//���_�̍���
		j+=(i-2);
	}	
	return(h);
}

//1�̃{�[�������i�[����N���X
var aBall = function(ballId){
	//�R���X�g���N�^
	this.ballId = ballId;								//�{�[��ID:0�`35
	this.x = 0;											//���݈ʒu(x���W)
	this.y = 0;											//���݈ʒu(y���W)
	this.x0 = 0;										//�J�n�ʒu(x���W)
	this.y0 = 0;										//�J�n�ʒu(y���W)
	this.t = 0;											//�����n�߂Ă���̃X�e�b�v��
	this.v0 = 0;										//����(y)
	this.vx = 0;										//���x(x)
	this.a = 0;											//�����x(������Ƃ���+,�ێ��̂Ƃ���-)
	this.nowSS;											//�������Ă���SS
	this.count = 0;										//�c��J�E���g(2�ȏ�:�������A1:�ێ��Ɉڂ�A0:���̓����Ɉڂ�)
	this.holdFlag = false;								//����2�̂Ƃ��̕ێ���Ԃł��邱�Ƃ�����
	this.catchHand = "";								//���Ɏ󂯎���("LC","LT","RT","RC")�̂ǂꂩ
	this.times = 0;
	this.Image = new Image();							//�摜�I�u�W�F�N�g
	this.Image.style.position = "absolute";				//��Δz�u���[�h

	//�{�[���ʒu�𒲐�
	this.adjustPlace = function(){
		this.x = this.x*smallRangeX + leftSpace;
		this.y = -this.y*smallRangeY + baseLine;
	}

	//���W���Z�b�g
	this.setPlace = function(x,y){
		this.x = x;
		this.y = y;
		this.x0 = x;
		this.y0 = y;
		this.adjustPlace();
		this.Image.style.left = this.x;			//�\�����W��ݒ�
		this.Image.style.top  = this.y;			//�\�����W��ݒ�		
	}
	
	//(x0,y0)�`(x1,y1)�Ɍ������ĕ����^�������邽�߂̏����ݒ�A�؋󎞊Ԃ�n�r�[�g
	//p=1:����,p=-1:�ێ�
	this.setThrowStatus = function(x0,y0,x1,y1,n,p){
		if(p==1) this.a = a_n[n+1];					//�����x�ݒ�(n�r�[�g�؋�Ȃ��SS��n+1)		
		else this.a = a_hold;						//�ێ��̏ꍇ�͉����xa_hold(��)���g�p
		this.setPlace(x0,y0);						//���W�Z�b�g
		this.v0 = (y1-y0)/(s*n) + this.a*s*n/2;		//����(y������)
		this.vx = (x1-x0)/(s*n);					//���x(x������)
		this.t = 0;									//���쎞�Ԃ����Z�b�g
	}

	//�T�C�g�X���b�v�̍������󂯎���āA�����l���Z�b�g����
	//0�̓��͂͑z�肵�Ȃ�
	this.setThrowHeight = function(SS){
		this.count = SS;		//�����J�E���g���Z�b�g
		this.times = 0;			//�����n�߂Ă���̌o�ߎ���
		this.nowSS = SS;		//�������Ă���SS���Z�b�g
		if(this.catchHand == "LT"){			//���肩�瓊����Ƃ�			
			if(SS==1) 		 {this.setThrowStatus(xLT,yLT,xRT,yRT,1,1);		this.catchHand = "RT";}	//�L���b�`�����瑦���ɓ���
//			else if(SS==2)	 {this.setNoMove(2);							this.catchHand = "LT";}	//�����ʒu�Ń{�[�����Œ�(����ߒ�)
			else if(SS==2)	 {this.setThrowStatus(xLT,yLT,xLC,yLC,1,1);		this.catchHand = "LC";}	//�������܂܃L���b�`�ʒu�։^��
			else if(SS%2==1) {this.setThrowStatus(xLT,yLT,xRC,yRC,SS-1,1);	this.catchHand = "RC";}	//��̂Ƃ��͔��΂̎��
			else			 {this.setThrowStatus(xLT,yLT,xLC,yLC,SS-1,1);	this.catchHand = "LC";}	//�����̂Ƃ��̓Z���t
		}else{					//�E�肩�瓊����Ƃ�
			if(SS==1) 		 {this.setThrowStatus(xRT,yRT,xLT,yLT,1,1);		this.catchHand = "LT";}	//�L���b�`�����瑦���ɓ���
//			else if(SS==2)	 {this.setNoMove(2);							this.catchHand = "RT";}	//�����ʒu�Ń{�[�����Œ�(����ߒ�)
			else if(SS==2)	 {this.setThrowStatus(xRT,yRT,xRC,yRC,1,1);		this.catchHand = "RC";}	//�������܂܃L���b�`�ʒu�։^��
			else if(SS%2==1) {this.setThrowStatus(xRT,yRT,xLC,yLC,SS-1,1);	this.catchHand = "LC";}	//��̂Ƃ��͔��΂̎��
			else			 {this.setThrowStatus(xRT,yRT,xRC,yRC,SS-1,1);	this.catchHand = "RC";}	//�����̂Ƃ��̓Z���t
		}
	}

	//�ێ����邽�߂̏����l���Z�b�g����
	this.setHoldHeight = function(){
		if(this.catchHand=="LC")		{this.setThrowStatus(xLC,yLC,xLT,yLT,1,-1);		this.catchHand = "LT";}
		else if(this.catchHand=="LT")	{this.setNoMove(1);								this.catchHand = "LT";}
		else if(this.catchHand=="RC")	{this.setThrowStatus(xRC,yRC,xRT,yRT,1,-1);		this.catchHand = "RT";}
		else if(this.catchHand=="RT")	{this.setNoMove(1);								this.catchHand = "RT";}
	}

	//�������A�ێ������Ȃ�(n�r�[�g��ɓ�������悤�ɃL���b�`�̈ʒu�Ń{�[���L�[�v)
	this.setNoMove = function(n){
		this.count=n;
		this.v0 = this.vx = this.a = 0;			//�S�Ă̑��x��0
		if(this.catchHand=="LC")		this.setPlace(xLC,yLC);
		else if(this.catchHand=="LT")	this.setPlace(xLT,yLT);
		else if(this.catchHand=="RC")	this.setPlace(xRC,yRC);
		else if(this.catchHand=="RT")	this.setPlace(xRT,yRT);
	}

	//�����n�߂̏����ʒu�Ƀ{�[�����Z�b�g
	//�ŏ���1�r�[�g�́A1�ԍŏ��ɓ�����{�[����ێ�����̂Ɏg��
	//2�ڈȍ~�̃{�[���͎肩�痣�ꂽ�ʒu�ɒu���Ă���
	this.setStartPosition = function(n,hand){
		this.count=n+1;			//�ŏ��ɓ�����{�[��:�ێ���ԁA�Ƃ��Ďn�߂�
		this.v0 = this.a = 0;
		this.times = 0;			//�����n�߂Ă���̌o�ߎ���
		if(hand==1){			//���肩�瓊����Ƃ�
			this.catchHand = "LC";
			if(n==0){							//���̌シ��������ꍇ�͕ێ��ʒu�ɃZ�b�g
				this.setPlace(xLC,yLC);
			}else{
				this.setPlace(xLC-startDistance,yLC);
				this.vx = startDistance/(s*n);
				this.t = 0;
			}
		}else{					//�E�肩�瓊����Ƃ�
			this.catchHand = "RC";
			if(n==0){
				this.setPlace(xRC,yRC);			//���̌シ��������ꍇ�͕ێ��ʒu�ɃZ�b�g
			}else{
				this.setPlace(xRC+startDistance,yRC);
				this.vx = -startDistance/(s*n);
				this.t = 0;
			}
		}
	}

	//�ʒu���X�V(���Ԃ��i��)
	this.updatePlace = function(){
		this.t+=dt;
		this.x = this.x0 + this.vx*this.t;
		this.y = this.y0 + this.v0*this.t - this.a*this.t*this.t/2;
		if(this.y<yBase && this.a>0) this.y = yBase;	//�{�[�������艺�ɕ\�������̂�h��
		this.adjustPlace();								//���W��ϊ�
		this.Image.style.left = this.x;
		this.Image.style.top  = this.y;
	}
	
	//�ʒu���ăZ�b�g(���Ԃ͐i�܂Ȃ�)
	this.renewPlace = function(){
		this.x = this.x0 + this.vx*this.t;
		this.y = this.y0 + this.v0*this.t - this.a*this.t*this.t/2;	
		this.adjustPlace();
		this.Image.style.left = this.x;
		this.Image.style.top  = this.y;
	}
}

//1�̎�̏����i�[����N���X
//hand=1:����Ahand=-1:�E��
var aHand = function(hand){
	this.x = 0;											//���݈ʒu(x���W)
	this.y = 0;											//���݈ʒu(y���W)
	this.x0 = 0;										//�J�n�ʒu(x���W)
	this.y0 = 0;										//�J�n�ʒu(y���W)
	this.t = 0;											//�����n�߂Ă���̃X�e�b�v��
	this.v0 = 0;										//����(y)
	this.vx = 0;										//���x(x)
	this.a = 0;											//�����x(������Ƃ���+,�ێ��̂Ƃ���-)
	this.catchHand = "";								//���̈ړ���("C","T")�̂ǂ��炩
	this.waitFlag = 0;									//�ҋ@�t���O(���ꂪ�����Ă���Ԃ̓L���b�`�ʒu�ŕێ�)

	this.hand = hand;
	this.Image = new Image();										//�摜�I�u�W�F�N�g
	if(this.hand == 1)	this.Image.src = "image/LeftHand.png";		//����
	else				this.Image.src = "image/RightHand.png";		//�E��
	this.Image.style.position = "absolute";							//��Δz�u���[�h

	//��̈ʒu���`
	if(hand == 1){			//����
		this.xC = xLC;
		this.yC = yLC;
		this.xT = xLT;
		this.yT = yLT;
	}else{					//�E��
		this.xC = xRC;
		this.yC = yRC;
		this.xT = xRT;
		this.yT = yRT;	
	}

	//��̈ʒu�𒲐�
	this.adjustPlace = function(){
		this.x = this.x*smallRangeX + leftSpace - handDiffX;
		this.y = -this.y*smallRangeY + baseLine - handDiffY;
	}

	//���W���Z�b�g
	this.setPlace = function(x,y){
		this.x = x;
		this.y = y;
		this.x0 = x;
		this.y0 = y;
		this.adjustPlace();
		this.Image.style.left = this.x;			//�\�����W��ݒ�
		this.Image.style.top  = this.y;			//�\�����W��ݒ�		
	}
	
	//(x0,y0)�`(x1,y1)�Ɍ������ĕ����^�������邽�߂̏����ݒ�A�؋󎞊Ԃ�1�r�[�g�ŌŒ�
	//p=1:�肪��(��),p=-1:�ێ�(��)
	this.setThrowStatus = function(x0,y0,x1,y1,p){
		if(p==1) this.a = a_n[2];					//�����x�ݒ�(�{�[���̉����x(2)�Ɠ���)		
		else this.a = a_hold;						//�ێ��̏ꍇ�͉����xa_hold(��)���g�p
		this.setPlace(x0,y0);						//���W�Z�b�g
		this.v0 = (y1-y0)/s + this.a*s/2;			//����(y������)
		this.vx = (x1-x0)/s;						//���x(x������)
		this.t = 0;									//���쎞�Ԃ����Z�b�g
	}	

	//����ړ������邽�߂̏����l�Z�b�g(�����ʒu����L���b�`�ʒu��)
	this.setHandThrow2Catch = function(){
		this.setThrowStatus(this.xT,this.yT,this.xC,this.yC,1);
		this.catchHand = "C";										//�ړ���
	}

	//����ړ������邽�߂̏����l�Z�b�g(�L���b�`�ʒu���瓊���ʒu��)
	this.setHandCatch2Throw = function(){
		this.setThrowStatus(this.xC,this.yC,this.xT,this.yT,-1);
		this.catchHand = "T";										//�ړ���
	}

	//�������A�ێ������Ȃ�(�L���b�`�̈ʒu�Ń{�[���L�[�v)
	this.setNoMove = function(){
		if(this.waitFlag>0){				//���ɑҋ@��Ԃɓ����Ă����ꍇ
			this.waitFlag--;
		}else{								//�V�K�ɑҋ@��Ԃɓ������ꍇ
			this.waitFlag = 1;				//�ҋ@��Ԃł��邱�Ƃ������t���O
			this.v0 = this.vx = this.a = 0;			//�S�Ă̑��x��0
			this.setPlace(this.xC,this.yC);
			this.catchHand = "C";
		}
	}

	//�ʒu���X�V(���Ԃ��i��)
	this.updatePlace = function(){
		this.t+=dt;
		this.x = this.x0 + this.vx*this.t;
		this.y = this.y0 + this.v0*this.t - this.a*this.t*this.t/2;	
		this.adjustPlace();
		this.Image.style.left = this.x;
		this.Image.style.top  = this.y;
	}

	//�ʒu���ăZ�b�g(���Ԃ͐i�܂Ȃ�)
	this.renewPlace = function(){
		this.x = this.x0 + this.vx*this.t;
		this.y = this.y0 + this.v0*this.t - this.a*this.t*this.t/2;	
		this.adjustPlace();
		this.Image.style.left = this.x;
		this.Image.style.top  = this.y;
	}
}

//��Ԑ�����A�e�{�[�������Ԗڂɓ������邩(1������͉̂����ڂ�)��Ԃ�
//�V�����[(51):��Ԑ�11(10�i)��1011(2�i)��
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

//��Ԑ���SS����A�e�{�[���́A�ŏ��ɂǂ̍����œ����邩��Ԃ�
//�V�����[(51):��Ԑ�11(10�i)��1011(2�i)��1101(���])
//1101		1������Ƃ����SS�����ɕԂ�
//5151�c	f[0]=5,f[1]=1,f[2]=1
function calcFirstHeight(SS,state){
	var b = calcBinary(state);	//��Ԑ�(2�i)
	var i,j=0,k=0;
	var firstHeight = new Array();
	for(i=0;i<b.length;i++){
		//��Ԑ���1�������Ă����ꍇ	
		if(b[i]==1){
			firstHeight[j] = SS[k];	//j�Ԗڂ̃{�[���͍���SS[k]�œ�����
			j++;
		}
		k=(k+1)%SS.length;
	}
	return(firstHeight);
}

//�y�[�W���ǂݍ��܂ꂽ�Ƃ��ɌĂ΂��֐�
function loadPage(id_body){
}

//SS��index���󂯎���āAindex�Ԗڂ����̐F��ς����������Ԃ�
function colorIndexString(charSS, index){
	var charSSa = charSS.substring(0,index);
	var charSSb = charSS.charAt(index);
	var charSSc = charSS.substring(index+1,charSS.length);
	
	var colorString = "<h3 style='display:inline;'>" + charSSa
					+ "<font color=red>" + charSSb + "</font>"
					+ charSSc + "</h3>";
	return(colorString);
}

//nowState�ɉ����ĐF��ς����������Ԃ�
function colorIndexString2(){
	var charSSa,charSSb,charSSc;
	var tmpIndex;
	var colorString = "<h3 style='display:inline;'>";

	if(nowState==1){	//�J�ڑO�������ꍇ
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
		if(nowState==2){	//�Гr���������ꍇ
			charSSa = charTrans.substring(0,transIndex);
			charSSb = charTrans.charAt(transIndex);
			charSSc = charTrans.substring(transIndex+1,charTrans.length);
			colorString += ( charSSa + "<font color=red>" + charSSb + "</font>" + charSSc + "-");		
			transIndex++;
		}else{
			colorString += (charTrans + "-");
		}
	}

	if(nowState==3){		//�J�ڌゾ�����ꍇ
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

//SS���������́Aindex�Ԗڂ�Ԃ����ĕԂ�(1�i��)
function colorIndexString3_1(charSS, index){
	//1�i�ڂ�2�i�ڂ𕪂���
	var charSSnow  = charSS.substring(0,randSSLength);
	//1�i�ڂ������3�ɕ���
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

//SS���������͂��ĕԂ�(2�i��)
function colorIndexString3_2(charSS){
	//1�i�ڂ�2�i�ڂ𕪂���
	var charSSnext = charSS.substring(randSSLength,randSSLength*2);
	//1�i�ڂ������3�ɕ���
	var colorString = "<h3 style='display:inline;'>"
					+ "<font color=gray>" + charSSnext + "</font>" + "</h3>";
	return(colorString);
}

//�{�[���A��̎��X�e�[�^�X���X�V
function setNextStatus(){
	var i;
	var nextSS1 = intSS[(SSindex+1)%intSS.length];	//1���SS

	//�S�{�[���̎��X�e�[�^�X��ݒ�
	for(i=0;i<balls.length;i++){
		//2�ł͂Ȃ����A����2�ł��邽�ߗ�O�I�Ɏ~�܂��Ă����ꍇ
		if(balls[i].holdFlag){
			//SS�ɂ��{�[������ύX����t���O�������Ă����ꍇ�̓{�[���F�ύX
			if(changeBallBySS){
				balls[i].Image.src = "image/ball_ss02.png";
				balls[i].Image.width = nowBallSize;		//�T�C�Y�ݒ�
				balls[i].Image.height = nowBallSize;
			}
			balls[i].holdFlag = false;
		}
		//�u�����v�̏ꍇ
		if(balls[i].count==0){
			balls[i].setThrowHeight(intSS[SSindex]);	//���ɓ�����{�[�����Z�b�g
			//SS�ɂ��{�[������ύX����t���O�������Ă����ꍇ�̓{�[���F�ύX
			if(changeBallBySS){
				balls[i].Image.src = (balls[i].nowSS<10) ?
					"image/ball_ss" + "0" + balls[i].nowSS + ".png" :
					"image/ball_ss" + balls[i].nowSS + ".png" ;
				balls[i].Image.width = nowBallSize;		//�T�C�Y�ݒ�
				balls[i].Image.height = nowBallSize;					
			}
		}
		//�u�ێ��v�̏ꍇ
		else if(balls[i].count==1){
			//����"2"�Ȃ�A�ێ���Ԃɓ��炸�L���b�`�ʒu�Ŏ~�߂�
			if(nextSS1==2){
			 	balls[i].setNoMove(3);
				balls[i].holdFlag = true;	//1�r�[�g���"2"�Ɉڂ邱�Ƃ������t���O
			}
			else balls[i].setHoldHeight();	//���ɕێ�����{�[�����Z�b�g
		}
	}
	//��̎��X�e�[�^�X��ݒ�
	if(LeftHand.catchHand=="C"){
		if(LeftHand.waitFlag>0) LeftHand.setNoMove();
		else{
			//����0��2�Ȃ�L���b�`�ʒu�Ŏ���L�[�v
			//�������A���̑O��1���󂯎��K�v������ꍇ�̓L�[�v���Ȃ�
			if((nextSS1==0 || nextSS1==2)&&intSS[SSindex]!=1) {LeftHand.setNoMove();}
			else											  {LeftHand.setHandCatch2Throw();}
		}
	}else{
		LeftHand.setHandThrow2Catch();
	}
	if(RightHand.catchHand=="C"){
		if(RightHand.waitFlag>0) RightHand.setNoMove();
		else{
			//����0��2�Ȃ�L���b�`�ʒu�Ŏ���L�[�v
			//�������A���̑O��1���󂯎��K�v������ꍇ�̓L�[�v���Ȃ�			
			if((nextSS1==0 || nextSS1==2)&&intSS[SSindex]!=1) {RightHand.setNoMove();}
			else											  {RightHand.setHandCatch2Throw();}
		}
	}else{
		RightHand.setHandThrow2Catch();
	}
}

//�{�[�����ƂɌo�ߎ��Ԃ����Z�A�Y����������
function tuneBalls(){
	var i;
	for(i=0;i<balls.length;i++) {
		balls[i].count--;				//�e�{�[���̎c��J�E���g�����炷
		balls[i].times++;				//�e�{�[���̌o�ߎ��Ԃ𑝂₷
		balls[i].t = balls[i].times*s;	//T��t�̃Y�����y�����邽�߁A�{�[�����Ƃ̌o�ߎ��Ԃ����Z�b�g
	}
}

function moveBalls(){
	var i;
	//�r�[�g�J�n�n�_�������ꍇ
	if(T==0){
		setNextStatus();									//�{�[���A��̎��X�e�[�^�X���v�Z
		SSindex = (SSindex+1)%intSS.length;					//�C���f�b�N�X��i�߂�		
	}
	for(i=0;i<balls.length;i++) balls[i].updatePlace();		//�S�{�[���̏����A�b�v�f�[�g
	LeftHand.updatePlace();									//����̏����A�b�v�f�[�g
	RightHand.updatePlace();								//�E��̏����A�b�v�f�[�g
	
	//���Ԃ�i�߂�
	T+=dt;
	
	//1�r�[�g���I�������ꍇ
	if(T>=s){
		//���ɓ�����SS�̐F��ς���
		document.getElementById("ssArea1").innerHTML = colorIndexString(charSSx1,SSindex);
		//�{�[�����Ƃ̔�����
		tuneBalls();
		T=0;								//�r�[�g�����Z�b�g
	}	
}

function moveBalls2(){
	var i;
	//�r�[�g�J�n�n�_�������ꍇ
	if(T==0){
		forwardLock = true;									//���փ{�^���������Ȃ�����
		setNextStatus();									//�{�[���A��̎��X�e�[�^�X���v�Z
		SSindex = (SSindex+1)%intSS.length;					//�C���f�b�N�X��i�߂�		
		forwardLock = false;								//���փ{�^���̃��b�N����
	}
	for(i=0;i<balls.length;i++) balls[i].updatePlace();		//�S�{�[���̏����A�b�v�f�[�g
	LeftHand.updatePlace();									//����̏����A�b�v�f�[�g
	RightHand.updatePlace();								//�E��̏����A�b�v�f�[�g
	
	//���Ԃ�i�߂�
	T+=dt;
	
	//1�r�[�g���I�������ꍇ
	if(T>=s){
		forwardLock = true;					//���փ{�^���������Ȃ�����		
		//�S�Ẵ{�[������x������܂ł͑J�ڕs�ɂ��邽�߂̏���
		if(transableCount>=1){
			transableCount--;
			if(transableCount==0){
				forwardable = true;
				document.images["forwardButton"].src="image/btn_forward.png";
			}
		}
		//�J�ڃt���O�������Ă����ꍇ
		if(transTimer>0){
			stateBeforeCount--;
			if(stateBeforeCount==0){
				nowState=2;			//��Ԃ��u�В��v�ɕύX
				transIndex=0;		//�В���index��ݒ�
			}
			transTimer--;			//�t���O���Z
			if(transTimer==0){		//�㔼�̓����Ɉڂ�
				intSS = copyArray(intSSx2);
				SSindex = 0;
				nowState=3;			//��Ԃ��u�J�ڒ��v�ɕύX
			}
		}
		//���ɓ�����SS�̐F��ς���
		document.getElementById("ssArea1").innerHTML = colorIndexString2();
		//�{�[�����Ƃ̔�����
		tuneBalls();
		T=0;								//�r�[�g�����Z�b�g
		forwardLock = false;				//���փ{�^���̃��b�N����
	}	
}

//�����_���ɓ�����ꍇ
function moveBalls3(){
	var i;
	//�r�[�g�J�n�n�_�������ꍇ
	if(T==0){
		setNextStatus();									//�{�[���A��̎��X�e�[�^�X���v�Z
		calcRandomNextSS(intSS,binaryState,randMaxHeight);
		intSS.shift();
	}
	for(i=0;i<balls.length;i++) balls[i].updatePlace();		//�S�{�[���̏����A�b�v�f�[�g
	LeftHand.updatePlace();									//����̏����A�b�v�f�[�g
	RightHand.updatePlace();								//�E��̏����A�b�v�f�[�g

	//���Ԃ�i�߂�
	T+=dt;

	//1�r�[�g���I�������ꍇ	
	if(T>=s){
		//���ɓ�����SS�̐F��ς���(��ɐ擪�ɒ��F)
		document.getElementById("ssArea1").innerHTML = colorIndexString3_1(charSSx1,randSSdispIndex);
		document.getElementById("ssArea2").innerHTML = colorIndexString3_2(charSSx1);		
		//SS(������)�ɁA���肵�Ă���Ō��intSS��ǉ�
		charSSx1 += ch[intSS[randSSLength*2]];
		
		randSSdispIndex++;
		//�\��SS�̒i����ύX���鏈��
		if(randSSdispIndex == randSSLength){
			//���܂ŏ�i��������������C�ɐ؂�̂Ă�
			charSSx1 = charSSx1.substring(randSSLength,randSSLength*3);
			randSSdispIndex = 0;
		}
		
		//�{�[�����Ƃ̔�����
		tuneBalls();
		T=0;								//�r�[�g�����Z�b�g
	}		
}


//�����̍ő�l�����ɏk�ڂ��Z�b�g
function setReducedScale(maxHeight){
	//y���W�k�ڐݒ�
	//�{�[���̍ő卂���A���ʒu(��Ɗ{�̋���+���̒���)�̂����傫����
	var topPos = max2(maxHeight,headToHand+headImageHeight);
	if(topPos > browserHeightMax) {
		smallRangeY = browserHeightMax/maxHeight;	//�k����(������browserHeightMax�Ɏ��܂�悤�ɒ���)
		baseLine = browserHeightMax + upSpace;		//�x�[�X���C��(��ԉ��̍��W)
	}else{
		baseLine = topPos + upSpace;
	}
	//x���W�k�ڐݒ�
	smallRangeX = smallRangeY;
	if(holdWidth*smallRangeX<holdWidthMin){			//�{�[���ێ����̍ŏ��l�������ꍇ�́A
		smallRangeX = holdWidthMin/holdWidth;		//�ێ������ŏ��l�Ɠ������Ȃ�悤�ɔ{���ݒ�
	}
	//���肵���k�ڂ��g�嗦�̊�l�Ƃ��ĕۑ�
	smallRangeXBasis = smallRangeX;
	smallRangeYBasis = smallRangeY;
	baseLineBasis = baseLine;
}

//���̈ʒu���Z�b�g
function setHeadPlace(head){
	head.style.left = (xLC + xRC)/2 + ballImageSize/2 - headImageWidth/2;
	head.style.top = yBase + headToHand + headImageHeight;
	return(head);
}

//���̈ʒu�𒲐�
function adjustHeadPlace(head){
	var x = parseInt(head.style.left);
	var y = parseInt(head.style.top);
	x = x*smallRangeX + leftSpace;
	y = -y*smallRangeHeadY + baseLine;
	head.style.left = x;
	head.style.top = y;
	return(head);
}

//�g�嗦�A���̉摜�T�C�Y���`
function defineZoom(){
	//��l���A�N�b�L�[����Z�b�g�����{���Ɋ�Â��Ċg��k��
	smallRangeX = smallRangeXBasis * zoom;		//��A�{�[���̍��W�k��(X)
	smallRangeY = smallRangeYBasis * zoom;		//��A�{�[���̍��W�k��(Y)
	smallRangeHeadY = smallRangeHeadYBasis * zoom;	//���̍��W�k��(Y)
	//��ԉ��̍��W(�{�[���̒��_���W��ۂ��߁AupSpace(���_�̃u���E�U�g�b�v�Ԃ̋���)�����O���Ă���g��/�k��
	baseLine = (baseLineBasis-upSpace)*zoom + upSpace;
	nowBallSize = nowBallSizeBasis * zoom;		//�{�[���̃T�C�Y
	nowHandWidth = nowHandWidthBasis * zoom;	//��̃T�C�Y(����)
	nowHandHeight = nowHandHeightBasis * zoom;	//��̃T�C�Y(�c��)
	nowHeadWidth = nowHeadWidthBasis * zoom;
	nowHeadHeight = nowHeadHeightBasis * zoom;
	
	//�摜�������Ȃ��Ȃ�̂�h�����߁A�Œ�ł�1�s�N�Z���c��悤�ɂ���
	if(nowBallSize<1) nowBallSize = 1;
	if(nowHandWidth<1) nowHandWidth = 1;
	if(nowHandHeight<1) nowHandHeight = 1;
	if(nowHeadWidth<1) nowHeadWidth = 1;
	if(nowHeadHeight<1) nowHeadHeight = 1;	

}

//��A���A�{�[���̏����ݒ� + �\��
//�����̍ő�l�A�{�[���̌��A��Ԑ����󂯎��
function setFirstStatus(maxHeight,ballNum,state){
	var i;
	//--------�����ݒ�--------
	oParent = document.getElementById("body1");		//�e�G�������g���擾
	var throwTiming = calcThrowTiming(state);		//�e�{�[���́A�����n�߂̃^�C�~���O���v�Z
	var firstHeight = calcFirstHeight(intSS,state);	//�e�{�[�����ŏ��ɂǂ̍����œ����邩�v�Z	

	//���̉摜���擾(�ʒu���߂̂��߂ɓ��̃T�C�Y���K�v�Ȃ��߁A��s���Ď擾)
	head = new Image();
	head.style.position = "absolute";
	var headIdx = CookieRead("headIdx");	//�N�b�L�[���瓪��index�����o��
	if(headIdx == "" || headIdx == null) headIdx=defaultHead;		//null�`�F�b�N
	setHead(headIdx);
	
	//--------�\���T�C�Y����--------
	setReducedScale(maxHeight);						//�A�j���[�V�����S�̂̏k�ڂ�ݒ�

	//�{�[���T�C�Y��{���ɉ����ďk��		
	if(ballImageSize * smallRangeY < ballImageSizeMin) nowBallSize = ballImageSizeMin;
	else nowBallSize = ballImageSize * smallRangeY;
	//��̃T�C�Y��{���ɉ����ďk��
	if(handImageWidth * smallRangeY < handImageWidthMin){
		nowHandWidth = handImageWidthMin;
		nowHandHeight = handImageHeightMin;
	}else{
		nowHandWidth = handImageWidth * smallRangeY;
		nowHandHeight = handImageHeight * smallRangeY;
	}

	//�����W�A�T�C�Y�̏k����������
	//���̍��W�́A��̃T�C�Y���ǂꂾ���������Ȃ������ɉ����Č��܂�
	smallRangeHeadY = nowHandWidth/handImageWidth;
	smallRangeHeadYBasis = smallRangeHeadY;
	//���T�C�Y������
	nowHeadWidth = headImageWidth * smallRangeX;
	nowHeadHeight = headImageHeight * smallRangeHeadY;

	//���肵���\���T�C�Y����l�Ƃ��ĕۑ�
	nowBallSizeBasis = nowBallSize;
	nowHandWidthBasis = nowHandWidth;
	nowHandHeightBasis = nowHandHeight;
	nowHeadWidthBasis = nowHeadWidth;
	nowHeadHeightBasis = nowHeadHeight;

	//�g�嗦������A�g�嗦�Ɋ�Â��ĉ摜�T�C�Y���v�Z
	defineZoom();

	//����\��
	head = setHeadPlace(head);					//�ʒu���Z�b�g
	head = adjustHeadPlace(head);				//�ʒu�𒲐�
	oParent.appendChild(head);
	head.width = nowHeadWidth;					//�T�C�Y���Z�b�g
	head.height = nowHeadHeight;

	//�{�[���̒��S�Ǝ�̒��S�����킹�邽�߂̍������v�Z
	handDiffX = (nowHandWidth-nowBallSize)/2;
	handDiffY = nowHandHeight * handHoldSync;	

	//�{�[���p��
	var hand;
	balls = new Array(ballNum);
	for(i=0;i<ballNum;i++){
		balls[i] = new aBall(i);
		if(throwTiming[i]%2==0) hand=-1;					//�E��ɃZ�b�g
		else hand=1;										//����ɃZ�b�g
		balls[i].setStartPosition(throwTiming[i],hand);		//�{�[���̏����ێ��ʒu���Z�b�g
		balls[i].nowSS = firstHeight[i];					//�ŏ��ɓ�����SS���Z�b�g
	}
	//�{�[���摜��ݒ�
	var ballColorIdx = CookieRead("ballColorIdx");	//�N�b�L�[����F��index�����o��
	if(ballColorIdx == "" || ballColorIdx == null) ballColorIdx=defaultBall;	//null�`�F�b�N
	setBallColor(ballColorIdx)											//�Z�b�g

	//�摜�\��(��ɓ�����{�[������O�ɕ\�����邽�߁A�t���ŕ\��
	for(i=ballNum-1;i>=0;i--) {
		oParent.appendChild(balls[i].Image);
		balls[i].Image.width = nowBallSize;		//�T�C�Y�ݒ�
		balls[i].Image.height = nowBallSize;
	}
			
	//���p�ӁA�\��(��̓{�[���̎�O�ɕ\��)
	LeftHand = new aHand(1);		LeftHand.setNoMove();			//����̓L���b�`�ʒu�ŃL�[�v
	RightHand = new aHand(-1);		RightHand.setPlace(xRC,yRC);
	LeftHand.catchHand = "C";
	RightHand.catchHand = "C";
		
	oParent.appendChild(LeftHand.Image);
	oParent.appendChild(RightHand.Image);
	//�T�C�Y�ݒ�
	LeftHand.Image.width = nowHandWidth;
	LeftHand.Image.height = nowHandHeight;
	RightHand.Image.width = nowHandWidth;
	RightHand.Image.height = nowHandHeight;		

	//�X�N���[���o�[�������̂�h�����߁A�_�~�[�摜��z�u
	setDummyImage();	
	noScroll();
}

//�_�~�[�摜��z�u���鏈��(���W�̃Z�b�g�͂��Ȃ�)
function setDummyImage(){
	dummyImageX = new Image();		//�E��̈�ԉE
	dummyImageY = new Image();		//��̈ʒu�̈�ԉ�
	dummyImageX.src = "image/dummy.png";	dummyImageX.style.position = "absolute";	
	dummyImageY.src = "image/dummy.png";	dummyImageY.style.position = "absolute";
	oParent.appendChild(dummyImageX);
	oParent.appendChild(dummyImageY);
}

//�_�~�[�摜�̍��W���Z�b�g
function noScroll(){
	//�E��̈�ԉE�̉摜���W���Z�b�g
	var w = xRC*smallRangeX +  xBase + leftSpace + nowHandWidth;
	dummyImageX.style.left = w;				dummyImageX.style.top = 0;	
	//��̈ʒu�̈�ԉ��̉摜���W���Z�b�g
//	var h = (-a_hold*s*s/8+handImageHeight)*smallRangeY + yBase + baseLine -handDiffY;
	var h = (-a_hold*s*s/8+handImageHeight)*smallRangeY + yBase + baseLine +nowHandHeight;
	dummyImageY.style.left = 0;				dummyImageY.style.top = h;	
}

//�T�C�g�X���b�v�A�j���[�V������\������(�ڑ��Ȃ�)
function dispAnimation(){
	charSSx1 = SSdata["siteswap1"];
	intSS = toEval(charSSx1);								//�������int�ɕϊ�
	motionable = juggleCheck(intSS);						//�W���O�����O�\���𔻒�	
	
	//SS��\��(1�i�ڂ̂�)
	document.getElementById("ssArea1").innerHTML = 
	"<h3 style='display:inline;'>" + charSSx1 + "</h3>";
	//��̓y�[�W�ւ̃����N(���ߍ��ݗp�̏ꍇ�A��̓y�[�W��\���t���O(a=off)�������Ă����ꍇ�͔�\��)
	if(!embedFlag && !SSdata["analyzeOff"]){
		document.getElementById("analyzeLink").innerHTML = a_analyze1(charSSx1);
	}
	
	if(motionable){
		setAcceleration();									//�����x�������ݒ�
		var maxHeight = calcHeight( calcSSMax(intSS) );		//�����̍ő�l������
		var ballNum = calcBallNum(intSS);					//�{�[���̌�
		var state = calcState(intSS);						//��Ԑ����v�Z
		setFirstStatus(maxHeight,ballNum,state);			//�����̐ݒ�+�����摜�z�u
		T=0;												//�o�ߎ��Ԃ����Z�b�g
		SSindex = intSS.length-1;							//�C���f�b�N�X�����Z�b�g(�ŏ���1�r�[�g�ێ�������̂Ŗ����ɃZ�b�g)

		//�ꎞ��~�t���O�������Ă��Ȃ���΁A�A�j���[�V�������X�^�[�g
		if(!pauseFlag){
			timer = setInterval("moveBalls()",10);	
		}
	}else{
		//�W���O�����O�s�\�ȂƂ�
		dispMessage("�W���O�����O�s��");
	}	
}

//�T�C�g�X���b�v�A�j���[�V������\������(���ڐڑ�)
function dispAnimation2(){
	charSSx1 = SSdata["siteswap1"];		intSSx1 = toEval(charSSx1);
	charSSx2 = SSdata["siteswap2"];		intSSx2 = toEval(charSSx2);
	intSS = toEval(charSSx1);

	//�ڑ��\���𔻒�
	motionable = transCheck2(intSSx1,intSSx2);

	//SS��\��(1�i�ڂ̂�)
	document.getElementById("ssArea1").innerHTML = 
	"<h3 style='display:inline;'>" + charSSx1 + "-" + charSSx2 + "</h3>";
	//��̓y�[�W�ւ̃����N(���ߍ��ݗp�̏ꍇ�A��̓y�[�W��\���t���O(a=off)�������Ă����ꍇ�͔�\��)
	if(!embedFlag && !SSdata["analyzeOff"]){
		document.getElementById("analyzeLink").innerHTML = a_analyze2(charSSx1,charSSx2);
	}
	if(motionable){
		setAcceleration();											//�����x�������ݒ�	
		var maxHeight = calcHeight( calcSSMax2(intSSx1,intSSx2) );	//�����̍ő�l������
		var ballNum = calcBallNum(intSSx1);
		var state = calcState(intSS);						//��Ԑ����v�Z
		setFirstStatus(maxHeight,ballNum,state);			//�����̐ݒ�+�����摜�z�u
		T=0;												//�o�ߎ��Ԃ����Z�b�g
		SSindex = intSS.length-1;							//�C���f�b�N�X�����Z�b�g(�ŏ���1�r�[�g�ێ�������̂Ŗ����ɃZ�b�g)
		transTimer = 0;
		//forward�{�^�����g�p�s�\�ɂ���
		forwardable = false;
		forwardLock = true;	//�ŏ��̓��b�N�������Ă���
		transableCount = calcBinary( calcState(intSS) ).length;
		nowState = 1;		//��Ԃ��u�J�ڑO�v�ɃZ�b�g
		
		//�ꎞ��~�t���O�������Ă��Ȃ���΁A�A�j���[�V�������X�^�[�g
		if(!pauseFlag){
			timer = setInterval("moveBalls2()",10);	
		}
	}else{
		//�ڑ��s�\�ȂƂ�
		dispMessage("�ڑ��s��");
	}
}

//�T�C�g�X���b�v�A�j���[�V������\������(�Ђ��ڑ�)
function dispAnimation3(){
	charSSx1  = SSdata["siteswap1"];	intSSx1  = toEval(charSSx1);
	charSSx2  = SSdata["siteswap2"];	intSSx2  = toEval(charSSx2);
	charTrans = SSdata["trans"];		intTrans = toEval(charTrans);
	intSS = toEval(charSSx1);
	
	//�ڑ��\���𔻒�
	motionable = transCheck3(intSSx1,intTrans,intSSx2);

	//SS��\��(1�i�ڂ̂�)
	document.getElementById("ssArea1").innerHTML = 
	"<h3 style='display:inline;'>" + charSSx1 + "-" + charTrans  + "-" + charSSx2 + "</h3>";
	//��̓y�[�W�ւ̃����N(���ߍ��ݗp�̏ꍇ�A��̓y�[�W��\���t���O(a=off)�������Ă����ꍇ�͔�\��)
	if(!embedFlag && !SSdata["analyzeOff"]){	
		document.getElementById("analyzeLink").innerHTML = a_analyze3(charSSx1,charTrans,charSSx2);
	}
	if(motionable){
		setAcceleration();													//�����x�������ݒ�	
		var maxHeight = calcHeight( calcSSMax3(intSSx1,intTrans,intSSx2) );	//�����̍ő�l������	
		var ballNum = calcBallNum(intSSx1);
		var state = calcState(intSS);						//��Ԑ����v�Z
		setFirstStatus(maxHeight,ballNum,state);			//�����̐ݒ�+�����摜�z�u
		T=0;												//�o�ߎ��Ԃ����Z�b�g
		SSindex = intSS.length-1;							//�C���f�b�N�X�����Z�b�g(�ŏ���1�r�[�g�ێ�������̂Ŗ����ɃZ�b�g)
		transTimer = 0;
		//forward�{�^�����g�p�s�\�ɂ���
		forwardable = false;
		forwardLock = true;	//�ŏ��̓��b�N�������Ă���
		transableCount = calcBinary( calcState(intSS) ).length;
		nowState = 1;		//��Ԃ��u�J�ڑO�v�ɃZ�b�g

		//�ꎞ��~�t���O�������Ă��Ȃ���΁A�A�j���[�V�������X�^�[�g
		if(!pauseFlag){
			timer = setInterval("moveBalls2()",10);
		}
	}else{
		//�ڑ��s�\�ȂƂ�
		dispMessage("�ڑ��s��");
	}
}

//�T�C�g�X���b�v�A�j���[�V������\������(�����_��)
function dispAnimation4(){
	var i;
	//�p�����[�^�擾
	var randBallNum = SSdata["n"];		//�{�[���̌�
	randMaxHeight = SSdata["m"];	//�ő卂��

	//�p�����[�^����
	//�����A�{�[���������l�ł��邱�Ƃ͕ۏႳ��Ă���
	randBallNum = parseInt(randBallNum);
	randMaxHeight = parseInt(randMaxHeight);
	//�������{�[�����𒴂��Ă���΃W���O�����O�\
	if(randBallNum<=35 && randMaxHeight<=35 && randBallNum<=randMaxHeight){
		motionable = true;
	}else{
		motionable = false;
	}

	//��̓y�[�W�ւ̃����N(���ߍ��ݗp�̏ꍇ�A��̓y�[�W��\���t���O(a=off)�������Ă����ꍇ�͔�\��)
	if(!embedFlag && !SSdata["analyzeOff"]){
		document.getElementById("analyzeLink").innerHTML = a_analyze1("");
	}
	if(motionable){
		//�����_���T�C�g�X���b�v�̏�����Ԃ𐶐�
		intSS = new Array(1);
		intSS[0] = 0;			//�ŏ���1���p�ɁA�擪�Ƀ_�~�[�l�����Ă���

		//��ꂩ��X�^�[�g���邽�߁A�{�[��������1���L�^
		binaryState = new Array(35);
		for(i=0;i<35;i++){
			if(i<randBallNum) binaryState[i]=1;
			else binaryState[i]=0;
		}
		//������ԂƂ��āA��蒷�̃����_��SS�𐶐�
		//(2�i�\���ɂ��邽�߁ArandSSLength��2�{�̒����𐶐�
		for(i=0;i<randSSLength*2;i++) calcRandomNextSS(intSS,binaryState,randMaxHeight);

		//�\���p��SS������𐶐�(�擪�ɂ̓_�~�[�������Ă���̂ŏ����Ă���)
		charSSx1 = toChar(intSS);
		charSSx1 = charSSx1.substr(1,randSSLength*2);

		//SS��\��(1�i��)
		document.getElementById("ssArea1").innerHTML = colorIndexString3_1(charSSx1,-1);
		//SS��\��(2�i��)
		document.getElementById("ssArea2").innerHTML = colorIndexString3_2(charSSx1);

		setAcceleration();								//�����x�������ݒ�
		var maxHeight = calcHeight(randMaxHeight);		//�����̍ő�l������
		var state = a_(randBallNum);					//��Ԑ�
		setFirstStatus(maxHeight,randBallNum,state);	//�����̐ݒ�+�����摜�z�u
		T=0;											//�o�ߎ��Ԃ����Z�b�g
		SSindex = 0;									//�C���f�b�N�X�����Z�b�g(�ŏ���1�r�[�g�ێ�������̂Ŗ����ɃZ�b�g)
		randSSdispIndex = 0;							//�\���pindex�����Z�b�g
		
		//�ꎞ��~�t���O�������Ă��Ȃ���΁A�A�j���[�V�������X�^�[�g
		if(!pauseFlag){
			timer = setInterval("moveBalls3()",10);
		}
	}else{
		//�W���O�����O�s�\�ȂƂ�
		dispMessage("�W���O�����O�s��");
	}
}

//�����߂��{�^�������A�S�X�e�[�^�X��������Ԃɖ߂�
function rewind(){
	if(!motionable) return(false);
	var i;

	if( SSdata["p"]==1 || SSdata["p"]==3 || SSdata["p"]==4 || SSdata["p"]==7){
		//���ڐڑ�������Ƃ�
		if( SSdata["p"]==3 || SSdata["p"]==4 ){
			intSS = copyArray(intSSx1);
			forwardable = false;									//forward�{�^�����g�p�s�\�ɂ���
			forwardLock = true;										//�ŏ��̓��b�N�������Ă���
			transableCount = calcBinary( calcState(intSS) ).length;	//�S�{�[���𓊂�����܂ł͑J�ڕs��
			document.images["forwardButton"].src="image/btn_forward_invalid.png";
		}

		//��Ԑ��A�{�[�����A�C���f�b�N�X���v�Z
		var ballNum,state;
		if(SSdata["p"]==7){
			ballNum = parseInt(SSdata["n"]);
			state = a_(ballNum);
			SSindex = 0;					//�C���f�b�N�X�����Z�b�g(�ŏ���1�r�[�g�ێ�������̂Ŗ����ɃZ�b�g)
			randSSdispIndex = 0;			//�\���pindex�����Z�b�g			
		}else{
			ballNum = calcBallNum(intSS);
			state = calcState(intSS);
			SSindex = intSS.length-1;		//�C���f�b�N�X�����Z�b�g(�ŏ���1�r�[�g�ێ�������̂Ŗ����ɃZ�b�g)
		}

		//�����_���A�j���[�V�����̂Ƃ��̓Ǝ�����
		if( SSdata["p"]==7 ){
			//��ꂩ��X�^�[�g���邽�߁A�{�[��������1���L�^
			for(i=0;i<35;i++){
				if(i<ballNum) binaryState[i]=1;
				else binaryState[i]=0;
			}
			intSS = new Array();
			intSS[0] = 0;
			//������ԂƂ��āA��蒷�̃����_��SS�𐶐�
			//(2�i�\���ɂ��邽�߁ArandSSLength��2�{�̒����𐶐�
			for(i=0;i<randSSLength*2;i++) calcRandomNextSS(intSS,binaryState,randMaxHeight);
			//�\���p��SS������𐶐�(�擪�ɂ̓_�~�[�������Ă���̂ŏ����Ă���)
			charSSx1 = toChar(intSS);
			charSSx1 = charSSx1.substr(1,randSSLength*2);
		}
		
		//SS�\�����������Z�b�g(����F��)
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

		var throwTiming = calcThrowTiming(state);		//�e�{�[���́A�����n�߂̃^�C�~���O���v�Z
		var firstHeight = calcFirstHeight(intSS,state);	//�e�{�[�����ŏ��ɂǂ̍����œ����邩�v�Z
		//�{�[���p��
		var hand;
		for(i=0;i<ballNum;i++){
			if(throwTiming[i]%2==0) hand=-1;					//�E��ɃZ�b�g
			else hand=1;										//����ɃZ�b�g
			balls[i].setStartPosition(throwTiming[i],hand);		//�{�[���̏����ێ��ʒu���Z�b�g
			balls[i].nowSS = firstHeight[i];					//�ŏ��ɓ�����SS���Z�b�g
			balls[i].holdFlag = false;							//����"2"�ł��邱�Ƃ������t���O�𗎂Ƃ�
		}
		//�{�[���摜���Đݒ�
		var ballColorIdx = CookieRead("ballColorIdx");	//�N�b�L�[����F��index�����o��
		if(ballColorIdx == "" || ballColorIdx == null) ballColorIdx=defaultBall;		//null�`�F�b�N
		setBallColor(ballColorIdx)											//�Z�b�g		
		//�{�[���T�C�Y�����߂ăZ�b�g����(�T�C�Y�������̂�h�~)
		for(i=0; i<balls.length; i++){
			balls[i].Image.width = nowBallSize;		//�T�C�Y�ݒ�
			balls[i].Image.height = nowBallSize;
		}
		//��̃X�e�[�^�X�����Z�b�g
		LeftHand.waitFlag = 0;			RightHand.waitFlag = 0;	
		LeftHand.setNoMove();			RightHand.setPlace(xRC,yRC);
		LeftHand.catchHand = "C";		RightHand.catchHand = "C";
		//���ԃX�e�[�^�X�����Z�b�g
		nowState = 1;				//��Ԃ��u�J�ڑO�v�ɃZ�b�g
		T=0;						//�o�ߎ��Ԃ����Z�b�g
		transTimer = 0;				//�J�ڃt���O�����Z�b�g
	}
	return(false);
}

//�ꎞ��~�{�^�������A�ꎞ��~or�Đ�
function pauseOrPlay(){
	if(!motionable) return(false);
	if( SSdata["p"]==1 || SSdata["p"]==3 || SSdata["p"]==4 || SSdata["p"]==7 ){
		if(!pauseFlag){
			//�Đ����������ꍇ
			document.images["playButton"].src="image/btn_play.png";		//�摜���Đ��{�^���ɕύX
			clearInterval(timer);										//�^�C�}�[���N���A
			pauseFlag=true;
			setCookie("pause",1);										//�N�b�L�[�ɕۑ�
		}else{
			//�ꎞ��~���������ꍇ
			document.images["playButton"].src="image/btn_pause.png";	//�摜���|�[�Y�{�^���ɕύX
			if(SSdata["p"]==1) timer = setInterval("moveBalls()",10);	//�^�C�}�[���Z�b�g(�ڑ��Ȃ�)
			if(SSdata["p"]==3) timer = setInterval("moveBalls2()",10);	//�^�C�}�[���Z�b�g(���ڐڑ�)
			if(SSdata["p"]==4) timer = setInterval("moveBalls2()",10);	//�^�C�}�[���Z�b�g(�Ђ��ڑ�)
			if(SSdata["p"]==7) timer = setInterval("moveBalls3()",10);	//�^�C�}�[���Z�b�g(�����_��)
			pauseFlag=false;
			setCookie("pause",0);										//�N�b�L�[�ɕۑ�
		}
	}
	return(false);
}

//����Ԃɐi��
function forward(){
	if(forwardLock) return(false);		//���b�N���������Ă���(�����쒆,�X�e�[�^�X�X�V�Ȃ�)
	if(T==0) return(false);				//T=0�̂Ƃ��Ƀ{�^�����������ƃC���f�b�N�X���Y����̂ŉ����Ȃ�����
	if(!forwardable) return(false);		//�J�ڋ����Ȃ��Ƃ�(�{�[���𓊂������Ă��Ȃ��A��xforward���������A�Ȃ�)
	if( SSdata["p"]!=3 && SSdata["p"]!=4 ) 
		return(false);					//�ڑ��\�����ł͂Ȃ��Ƃ�

	var tmpIndex = (SSindex-1+intSS.length)%(intSS.length);	//�����Ă�index��1�O
	transTimer = intSS.length - tmpIndex;					//transTimer��Ɍ㔼�ɑJ�ڊJ�n

	//SS�̏�Ԃɂ���Ă��܂��������Ȃ��ꍇ�ւ̑Ώ�
	if(
		(	//����1(�Ōォ��2�ڂ�"2")
		 ((intSS.length==1 && intSS[0]==2) 				||
		  (intSS.length>=2 && intSS[intSS.length-2]==2))	&&
		 (SSindex!=intSS.length-1 || intSS.length==1)
		)
		||
		(	//����2(�擪��"2"�A�Ђ��ڑ�)
			SSdata["p"]==4  &&		//�Ђ��ڑ�
			intSS.length>=3 &&		//����2�ȉ��͏���1�őΉ��ς�
			intSS[0]==2		&&		//�擪��2�Ȃ�A�ڑ��̏������ł��Ȃ�
			intTrans[0]!=2			//�ڑ��̐擪��2�Ȃ�Ή��s�v
		)
		||
		(	//����3(�擪��"2"�A���ڐڑ�)
			SSdata["p"]==3  &&		//�Ђ��ڑ�
			intSS.length>=3 &&		//����2�ȉ��͏���1�őΉ��ς�
			intSS[0]==2		&&		//�擪��2�Ȃ�A�ڑ��̏������ł��Ȃ�
			intSSx2[0]!=2			//�㔼�̐擪��2�Ȃ�Ή��s�v
		)
	  ){
	     	intSS = intSS.concat(intSS);	//intSS��2��J��Ԃ�
			transTimer += (intSS.length/2);
	}

	//stateBeforeCount���SS1���I���
	stateBeforeCount = transTimer;
	
	//�Ђ�����
	if(SSdata["p"]==4){
		intSS = intSS.concat(intTrans);
		transTimer += intTrans.length;
	}
	if(SSindex==0) SSindex = intSSx1.length%intSS.length;	//index��0�ɂȂ�̂�h�~	
	intSS[intSS.length] = intSSx2[0];						//��̓��������킹�邽�߂Ɍ��ɒǉ�

	forwardable = false;	//��x�J�ڂ���������J�ڂł��Ȃ�
	document.images["forwardButton"].src="image/btn_forward_invalid.png";

	return(false);
}

//�l���󂯎��A������2�ʂ܂ŕ\������悤�ɕϊ����ĕԂ�(������)
//1��1.00�A1.2��1.20�A1.35��1.35
function calc2ndDecimal(a){
	var a2 = a + "";
	//�����Ȃ珬���_�ȉ���\������悤�ɕϊ�(1��1.0�A2��2.0�A3��3.0)
	if(a2.length==1) a2 += ".0";
	//�����_�ȉ�1�ʂ܂łȂ珬����2�ʂ�\������悤�ɕϊ�(1.0��1.00�A2.3��2.30)
	if(a2.length==3) a2 += "0";		
	return(a2);
}

//�X�s�[�h��\��
function dispSpeed(){
	//������2�ʂ܂ŕ\������悤�ɕϊ�
	var tmpDt = calc2ndDecimal(dt);
	document.getElementById("speedArea").innerHTML = 
	'<font color=blue size=2>' + tmpDt + '</font>';
}

//�X�s�[�h���N�b�L�[����擾���Đݒ�
function setSpeed(){
	dt = CookieRead("speed") -0;		//�N�b�L�[����擾(0�������Đ��l�ɕϊ�)
	dt = (Math.floor(dt*100+0.5))/100;	//�덷���ۂ߂邽�߂Ɏl�̌ܓ�
	if(dt<0.05 || dt>3.0)dt = 1.5;		//�l�����e�͈͂𒴂��Ă�����f�t�H���g(1.5)�ɐݒ�
}

//�g�嗦��\��
function dispZoom(){
	//������2�ʂ܂ŕ\������悤�ɕϊ�
	var tmpZoom = calc2ndDecimal(zoom);
	document.getElementById("zoomArea").innerHTML = 
	'<font color=blue size=2>' + tmpZoom + '</font>';
}

//�g�嗦���N�b�L�[����擾���Đݒ�
function setZoom(){
	zoom = CookieRead("zoom") -0;		//�N�b�L�[����擾(0�������Đ��l�ɕϊ�)
	if(zoom<0.05 || zoom>3.0)zoom = 1.0;	//�l�����e�͈͂𒴂��Ă�����f�t�H���g(1.0)�ɐݒ�
}

//�{�[���F��ύX����
function setBallColor(ballColorIdx){
	var i;
	//SS�ɂ���ă{�[������ς���t���O(��U���Ƃ�)
	changeBallBySS = false;
	
	//���̂Ƃ������Ă���T�C�g�X���b�v
	if(ballColorIdx == 0){
		changeBallBySS = true;		//�����摜��؂�ւ��邽�߂̃t���O�𗧂Ă�
		for(i=0; i<balls.length; i++){
			//���̂Ƃ������Ă���SS���擾
			balls[i].Image.src = (balls[i].nowSS<10) ?
				"image/ball_ss" + "0" + balls[i].nowSS + ".png" :
				"image/ball_ss" + balls[i].nowSS + ".png" ;
		}
	}
	//�t���J���[�����t��(�f�t�H���g)
	if(ballColorIdx == 1){
		for(i=0; i<balls.length; i++){
			balls[i].Image.src = (i<10) ?
				"image/ball" + "0" + i + ".png" : 
				"image/ball" + i + ".png" ;
		}
	}else
	//�t���J���[�����Ȃ�
	if(ballColorIdx == 2){
		for(i=0; i<balls.length; i++){
			balls[i].Image.src = (i<10) ?
				"image/ball2_" + "0" + i + ".png" : 
				"image/ball2_" + i + ".png" ;
		}
	}else
	//��
	if(ballColorIdx == 3){
		for(i=0; i<balls.length; i++) balls[i].Image.src = "image/ball_green.png";
	}else 
	//��
	if(ballColorIdx == 4){
		for(i=0; i<balls.length; i++) balls[i].Image.src = "image/ball_blue.png";
	}else 
	//��
	if(ballColorIdx == 5){
		for(i=0; i<balls.length; i++) balls[i].Image.src = "image/ball_red.png";
	}else 
	//��
	if(ballColorIdx == 6){
		for(i=0; i<balls.length; i++) balls[i].Image.src = "image/ball_yellow.png";
	}else 
	//����
	if(ballColorIdx == 7){
		for(i=0; i<balls.length; i++){
			if(i%2==0)	balls[i].Image.src = "image/ball_black.png";
			else		balls[i].Image.src = "image/ball_white.png";
		}
	}else 
	//�A�N�A
	if(ballColorIdx == 8){
		for(i=0; i<balls.length; i++){
			balls[i].Image.src = "image/ball_aqua.png";
		}
	}else 	
	//����
	if(ballColorIdx == 9){
		for(i=0; i<balls.length; i++){
			balls[i].Image.src = "image/ball_small.png";
		}
	}else 	
	//�ь�
	if(ballColorIdx == 10){
		for(i=0; i<balls.length; i++){
			balls[i].Image.src = "image/ball_apple.png";
		}
	}else 
	//����
	if(ballColorIdx == 11){
		for(i=0; i<balls.length; i++) balls[i].Image.src = "image/ball_orange.png";
	}else 
	//�������
	if(ballColorIdx == 12){
		for(i=0; i<balls.length; i++) balls[i].Image.src = "image/ball_moya.png";
	}else
	//��
	if(ballColorIdx == 13){
		var j;
		for(i=0; i<balls.length; i++){
			j=rand(12);
			balls[i].Image.src = (j<10) ?
				"image/ball_face" + "0" + j + ".png" : 
				"image/ball_face" + j + ".png" ;
		}	
	}else
	//�h���S���{�[��
	if(ballColorIdx == 14){
		var j;
		for(i=0; i<balls.length; i++){
			j = (i%7)+1;
			balls[i].Image.src = "image/ball_db" + j + ".png";
		}
	}	
}

//�R���{�{�b�N�X���ύX���ꂽ�Ƃ��A�{�[���̎�ނ�ύX
function changeBallColor(){
	//�t�H�[������I�����ꂽ�{�[����ʂ̃C���f�b�N�X���擾
	var selectedBallColorIdx = document.animationForm.ballColor.selectedIndex; 
	//�N�b�L�[�ɕۑ�����
	setCookie("ballColorIdx",selectedBallColorIdx);
	
	//�A�j���[�V�����\�����ł��Ă���Ƃ��̂ݐF�ύX�������{
	if(motionable){
		//�{�[���F�ύX����
		setBallColor(selectedBallColorIdx);
		//�{�[���T�C�Y�����߂ăZ�b�g����(�T�C�Y�������̂�h�~)
		var i;
		for(i=0; i<balls.length; i++){
			balls[i].Image.width = nowBallSize;		//�T�C�Y�ݒ�
			balls[i].Image.height = nowBallSize;
		}
	}
	return(false);
}

//�{�[���F��ύX����R���{�{�b�N�X
function dispBallColorComboBox(){
	//�F�f�[�^���`
	ballColorData = new Array(14);	
	ballColorData[0] = "SS";
	ballColorData[1] = "�t��1";
	ballColorData[2] = "�t��2";
	ballColorData[3] = "��";
	ballColorData[4] = "��";
	ballColorData[5] = "��";
	ballColorData[6] = "��";
	ballColorData[7] = "����";
	ballColorData[8] = "�A�N�A";
	ballColorData[9] = "����";
	ballColorData[10] = "�ь�";
	ballColorData[11] = "����";
	ballColorData[12] = "����";	
	ballColorData[13] = "��";
	ballColorData[14] = "DB";
	//�����l��ݒ�
	var n = CookieRead("ballColorIdx");	//�N�b�L�[����F��index�����o��
	if(n == "" || n == null) n=defaultBall;		//null�`�F�b�N
	//�R���{�{�b�N�X�\��
	var i;
	document.write("<select name=ballColor style='font-size:9pt;' onChange='changeBallColor()'>");
		for(i=0;i<ballColorData.length;i++){
			document.write("<option value='" + i + "'");
			if(n == i) {
				document.write(" selected");		//�����l���������ꍇ�͑I����Ԃɂ���
			}
			document.write(">" + ballColorData[i] +"</option>");
		}
	document.write("</select>");
}

//�����Z�b�g
function setHead(headIdx){
	//���\���Ȃ�
	if(headIdx == 0){
		head.src = "image/head_off.png";
		headImageWidth  = 1;
		headImageHeight = 63;
	}else
	//�ʏ�̓�
	if(headIdx == 1){
		head.src = "image/head_normal.png";
		headImageWidth  = 63;
		headImageHeight = 63;
	}else
	//�V���N�n�b�g
	if(headIdx == 2){
		head.src = "image/head_hat1.png";
		headImageWidth  = 85;
		headImageHeight = 85;
	}else
	//�T���O���X
	if(headIdx == 3){
		head.src = "image/head_glass.png";
		headImageWidth  = 65;
		headImageHeight = 63;
	}else	
	//����
	if(headIdx == 4){
		head.src = "image/head_devil.png";
		headImageWidth  = 111;
		headImageHeight = 81;
	}
}

//���̎�ނ�ύX
function changeHead(){
	//�t�H�[������I�����ꂽ����ʂ̃C���f�b�N�X���擾
	var selectedHeadIdx = document.animationForm.head.selectedIndex; 
	//�N�b�L�[�ɕۑ�����
	setCookie("headIdx",selectedHeadIdx);
	//�A�j���[�V�����\�����ł��Ă���Ƃ��̂ݓ��ύX�������{
	if(motionable){
		//���̎�ޕύX����
		setHead(selectedHeadIdx);
		//���̈ʒu���ăZ�b�g
		head = setHeadPlace(head);
		head = adjustHeadPlace(head);
		//���T�C�Y���ăZ�b�g
		nowHeadWidthBasis = headImageWidth * smallRangeXBasis;
		nowHeadHeightBasis = headImageHeight * smallRangeHeadYBasis;
		nowHeadWidth = nowHeadWidthBasis * zoom;
		nowHeadHeight = nowHeadHeightBasis * zoom;
		//�摜�������Ȃ��Ȃ�̂�h�����߁A�Œ�ł�1�s�N�Z���c��悤�ɂ���
		if(nowHeadWidth<1) nowHeadWidth = 1;
		if(nowHeadHeight<1) nowHeadHeight = 1;
		head.width = nowHeadWidth;
		head.height = nowHeadHeight;
	}
	return(false);
}

//���̎�ނ�ύX����R���{�{�b�N�X
function dispHeadComboBox(){
	//���f�[�^���`
	headData = new Array(5);
	headData[0] = "OFF";
	headData[1] = "Normal";
	headData[2] = "Hat";
	headData[3] = "Glass";	
	headData[4] = "Devil";
	//�����l��ݒ�
	var n = CookieRead("headIdx");	//�N�b�L�[���瓪��index�����o��
	if(n == "" || n == null) n=defaultHead;		//null�`�F�b�N
	//�R���{�{�b�N�X�\��
	var i;
	document.write("<select name=head style='font-size:9pt;' onChange='changeHead()'>");
		for(i=0;i<headData.length;i++){
			document.write("<option value='" + i + "'");
			if(n == i) document.write(" selected");		//�����l���������ꍇ�͑I����Ԃɂ���
			document.write(">" + headData[i] +"</option>");
		}
	document.write("</select>");
}

//�[���t���O���N�b�L�[����擾���ăZ�b�g
function setLessZeroFlag(){
	//�N�b�L�[�����Ԃ��擾
	var a = parseInt(CookieRead("lessZero"));
	if(a==1) lessZeroFlag = true;
	else lessZeroFlag = false;
}

//�����_���A�j���[�V�����\���A���S���Y����ς���
function changeRandomAnimationState(obj){
	//�[�������Ȃ�����t���O���`�F�b�N�{�b�N�X����擾
	lessZeroFlag = obj.checked;
	//�N�b�L�[�ɃZ�b�g
	if(lessZeroFlag) setCookie("lessZero",1);
	else setCookie("lessZero",0);
}

//�����_���A�j���[�V�����\������0�����Ȃ����邽�߂̃`�F�b�N�{�b�N�X
function dispLessZeroCheckBox(){
	//�`�F�b�N�{�b�N�X��\��
	document.write("<input type='checkbox' name='lessZero' value='' ");
	document.write("onClick='changeRandomAnimationState(this)' ");
	if(lessZeroFlag) document.write('checked');
	document.write('>');
	document.write("<font size='2'>0�����炷</font>");
}

//�X���C�h�o�[�̏���
function readySlideBar(){

	//----���ʏ���-----
	//��ʓ��Ń}�E�X���������Ƃ��̏������`
	document.onmousemove = onMouseMove;
	//��ʓ��Ń}�E�X�����������Ƃ��̏������`
	document.onmouseup = onMouseUp;

	//----�X�s�[�h�ύX�X���C�h�o�[�֘A----
	//�X���C�h�o�[������x���W���Z�b�g(��`�̓\�[�X�`��)
	document.getElementById("barline1").style.left = barLineLeftX1;
	//�X���C�h�o�[�̈ʒu���Z�b�g
	//�����̍��[+ (20dt-1) ��dt=x/20+0.05�Ȃ̂�
	document.getElementById("slidebar1").style.left = barLineLeftX1 + dt*20 -1;
	//�X���C�h�o�[��Ń}�E�X�������ꂽ�Ƃ��̏������`
	document.getElementById("slidebar1").onmousedown = onMouseDownOnSlideBar1;
	//������ŃN���b�N���ꂽ�Ƃ��̏������`
	document.getElementById("barline1").onmousedown = onClickBarLine1;

	//���ߍ��ݎ��͊g�嗦��ύX���Ȃ�
	if(!embedFlag){
		//----�g�嗦�ύX�X���C�h�o�[�֘A
		//�X���C�h�o�[������x���W���Z�b�g(��`�̓\�[�X�`��)
		document.getElementById("barline2").style.left = barLineLeftX2;
		//�X���C�h�o�[�̈ʒu���Z�b�g
		//�����̍��[+ (20zoom-1) ��zoom=x/20+0.05�Ȃ̂�
		document.getElementById("slidebar2").style.left = barLineLeftX2 + zoom*20 -1;
		//�X���C�h�o�[��Ń}�E�X�������ꂽ�Ƃ��̏������`
		document.getElementById("slidebar2").onmousedown = onMouseDownOnSlideBar2;	
		//������ŃN���b�N���ꂽ�Ƃ��̏������`
		document.getElementById("barline2").onmousedown = onClickBarLine2;
	}
}

//��ʓ��Ń}�E�X���������Ƃ��ɃX���C�h�o�[�̈ʒu���X�V�A���x���v�Z
function onMouseMove(e){
	//�X���C�h�o�[�I�u�W�F�N�g������(�X�s�[�h�ύX�X���C�h�o�[��Ń}�E�X��������Ă���)�Ƃ�
	if(slideBarObj1){
		//�X���C�h�o�[�̐V����x���W(�}�E�X�ʒu-�I�t�Z�b�g�l)���v�Z
		var slideBarX;
		if(document.all) {	//IE�n�̂Ƃ�
			slideBarX = event.clientX - offsetX + document.body.scrollLeft;
		}else{				//Fx�n�̂Ƃ�
			slideBarX = e.pageX - offsetX;
		}
		//�X���C�h�o�[�ړ�
		moveSlideBar1(slideBarX);
		return false;
	}
	//�X���C�h�o�[�I�u�W�F�N�g������(�k�ڕύX�X���C�h�o�[��Ń}�E�X��������Ă���)�Ƃ�	
	else if(slideBarObj2){
		//�X���C�h�o�[�̐V����x���W(�}�E�X�ʒu-�I�t�Z�b�g�l)���v�Z
		var slideBarX;
		if(document.all) {	//IE�n�̂Ƃ�
			slideBarX = event.clientX - offsetX + document.body.scrollLeft;
		}else{				//Fx�n�̂Ƃ�
			slideBarX = e.pageX - offsetX;
		}
		//�X���C�h�o�[�ړ�
		moveSlideBar2(slideBarX);
		return false;
	}
	//�X���C�h�o�[�I�u�W�F�N�g���Ȃ��Ƃ��͉������Ȃ�
	else return true;
}

//��ʓ��Ń}�E�X�����������Ƃ��ɃX���C�h�o�[���J������(�ړ��Ώۂł͂Ȃ��Ƃ݂Ȃ�)
function onMouseUp(){
	slideBarObj1 = null;		//�X�s�[�h�ύX�I��
	slideBarObj2 = null;		//�g�嗦�ύX�I��	
	setCookie("speed",dt);		//���x���N�b�L�[�ɃZ�b�g
	//���ߍ��ݎ��͊g�嗦��ۑ����Ȃ�
	if(!embedFlag){
		setCookie("zoom",zoom);		//�g�嗦���N�b�L�[�ɃZ�b�g
	}
}

//�X�s�[�h�ύX�p�X���C�h�o�[�̏�Ń}�E�X�{�^���������ꂽ�Ƃ���
//�X���C�h�o�[�ړ����[�h�ɓ���
function onMouseDownOnSlideBar1(e){
	//�X���C�h�o�[�I�u�W�F�N�g���Z�b�g(��`�̓\�[�X�`��)
	slideBarObj1 = document.getElementById("slidebar1");

	//�}�E�X�ʒu�Ɖ摜�̍��[�ʒu�̍������擾���Ă���
	if(document.all){	//IE�n�̂Ƃ�
		offsetX = event.offsetX + 2;
	}
	else{				//Fx�n�̂Ƃ�
		offsetX = e.pageX - parseInt(slideBarObj1.style.left);
	}
	return false;
}

//�g�嗦�ύX�p�X���C�h�o�[�̏�Ń}�E�X�{�^���������ꂽ�Ƃ���
//�X���C�h�o�[�ړ����[�h�ɓ���
function onMouseDownOnSlideBar2(e){
	//�X���C�h�o�[�I�u�W�F�N�g���Z�b�g(��`�̓\�[�X�`��)
	slideBarObj2 = document.getElementById("slidebar2");

	//�}�E�X�ʒu�Ɖ摜�̍��[�ʒu�̍������擾���Ă���
	if(document.all){	//IE�n�̂Ƃ�
		offsetX = event.offsetX + 2;
	}
	else{				//Fx�n�̂Ƃ�
		offsetX = e.pageX - parseInt(slideBarObj2.style.left);
	}
	return false;
}

//�X���C�h�o�[�̐���ŃN���b�N���ꂽ�ꍇ�A�o�[�������Ɉړ�
function onClickBarLine1(e){	
	//�N���b�N�ʒu(��΍��W)���v�Z(���������R�Ɍ����邽�߂ɏ��������Ă���)
	var slideBarX;
	if(document.all) {	//IE�n�̂Ƃ�
		slideBarX = event.clientX + document.body.scrollLeft-4;
	}else{				//Fx�n�̂Ƃ�
		slideBarX = e.pageX-2;
	}

	//���̂܂܃X���C�h�o�[�ړ��ɓ����悤�ɃI�u�W�F�N�g���Z�b�g���Ă���
	slideBarObj1 = document.getElementById("slidebar1");
	offsetX = 2;

	//�X���C�h�o�[�ړ�
	moveSlideBar1(slideBarX);
	return false;
}

//�X���C�h�o�[�̐���ŃN���b�N���ꂽ�ꍇ�A�o�[�������Ɉړ�
function onClickBarLine2(e){	
	//�N���b�N�ʒu(��΍��W)���v�Z(���������R�Ɍ����邽�߂ɏ��������Ă���)
	var slideBarX;
	if(document.all) {	//IE�n�̂Ƃ�
		slideBarX = event.clientX + document.body.scrollLeft-4;
	}else{				//Fx�n�̂Ƃ�
		slideBarX = e.pageX-2;
	}
	//���̂܂܃X���C�h�o�[�ړ��ɓ����悤�ɃI�u�W�F�N�g���Z�b�g���Ă���
	slideBarObj2 = document.getElementById("slidebar2");
	offsetX = 2;
	//�X���C�h�o�[�ړ�
	moveSlideBar2(slideBarX);
	return false;
}

//�X���C�h�o�[�ړ�����󂯎��A�z�u�A���x�ύX���s��
function moveSlideBar1(slideBarX){
	//�X���C�h�o�[�����x�ݒ�͈͊O�ɂ���ꍇ�͔͈͓��ɐݒ�
	if(slideBarX<barLineLeftX1)		slideBarX = barLineLeftX1;
	if(slideBarX>=barLineLeftX1+60)	slideBarX = barLineLeftX1+59;

	document.getElementById("slidebar1").style.left = slideBarX;			//�X���C�h�o�[�̈ʒu���X�V
	dt = (slideBarX-barLineLeftX1)/20 + 0.05;		//�X���C�h�o�[���W�Ɖ����̍��[�̍��W���瑬�x�v�Z
	dt = (Math.floor(dt*100+0.5))/100;			//�덷���ۂ߂邽�߂Ɏl�̌ܓ�	
	dispSpeed();								//���x����\��
}

//�X���C�h�o�[�ړ�����󂯎��A�z�u�A���x�ύX���s��
function moveSlideBar2(slideBarX){
	//�X���C�h�o�[�����x�ݒ�͈͊O�ɂ���ꍇ�͔͈͓��ɐݒ�
	if(slideBarX<barLineLeftX2)		slideBarX = barLineLeftX2;
	if(slideBarX>=barLineLeftX2+60)	slideBarX = barLineLeftX2+59;

	document.getElementById("slidebar2").style.left = slideBarX;			//�X���C�h�o�[�̈ʒu���X�V
	zoom = (slideBarX-barLineLeftX2)/20 + 0.05;	//�X���C�h�o�[���W�Ɖ����̍��[�̍��W����k�ڌv�Z
	zoom = (Math.floor(zoom*100+0.5))/100;			//�덷���ۂ߂邽�߂Ɏl�̌ܓ�
	dispZoom();								//�g�嗦��\��
	changeZoom();							//�g�嗦��ύX
}

//�k�ڂ����肷��p�����[�^���ꗥ�g��/�k������
function changeZoom(){
	//�A�j���[�V�����\�����ł��Ă���Ƃ��̂ݏk�ڕύX�������{
	if(motionable){
		//�g�嗦������
		defineZoom();
		//�Z�b�g�����{�[���T�C�Y�𔽉f
		for(i=0; i<balls.length; i++){
			balls[i].Image.width = nowBallSize;
			balls[i].Image.height = nowBallSize;
		}	
		//�Z�b�g������̃T�C�Y�𔽉f
		LeftHand.Image.width = nowHandWidth;
		LeftHand.Image.height = nowHandHeight;
		RightHand.Image.width = nowHandWidth;
		RightHand.Image.height = nowHandHeight;
		
		//�Z�b�g�������̃T�C�Y�𔽉f
		head.width = nowHeadWidth;
		head.height = nowHeadHeight;
		
		//�{�[���̒��S�Ǝ�̒��S�����킹�邽�߂̍������v�Z
		handDiffX = (nowHandWidth-nowBallSize)/2;
		handDiffY = nowHandHeight * handHoldSync;

		//���W���X�V
		for(i=0;i<balls.length;i++) balls[i].renewPlace();		//�S�{�[���̏����A�b�v�f�[�g
		LeftHand.renewPlace();									//����̏����A�b�v�f�[�g
		RightHand.renewPlace();									//�E��̏����A�b�v�f�[�g
		head = setHeadPlace(head);								//���̍��W���Z�b�g
		head = adjustHeadPlace(head);							//���̍��W�𒲐�
		//�X�N���[���o�[�������̂�h�����߂̏���
		noScroll();
	}
}

//�g�嗦�����Z�b�g(1.00�ɂ���)
function resetZoom(){
	zoom = 1;
	//�X���C�h�o�[�̈ʒu���X�V	
	document.getElementById("slidebar2").style.left = barLineLeftX2 + 20*zoom-1;
	dispZoom();														//�g�嗦��\��
	changeZoom();													//�g�嗦��ύX
	//�g�嗦���N�b�L�[�ɃZ�b�g
	setCookie("zoom",zoom);
}

//���ߍ��ݎ��p�ɁA�S�̂��͂ޘg�̃T�C�Y�����肷��
function setFrameSize(){
	//�_�~�[�C���[�W�z�u�ꏊ(�E��̉E���̍��W)���擾
	var w = parseInt(dummyImageX.style.left);
	//�����������͂ݏo�������Ȃ̂ŋC�����L�߂ɂ���
	w += 10;
	var h = parseInt(dummyImageY.style.top);
	//�g�̏c�����s�v�ɑ傫���Ȃ�̂�h�����߂̔������B�l�ɂ͍����Ȃ�(�v����)
	h -= (40*smallRangeY);
	//����
	//�c���́A�Œ჉�C���ƁA�G�\����(h)�̂����傫�������̗p
	if(SSdata["p"]==7){
		h = max2(h,188);
	}else{
		h = max2(h,140);
	}

	//�g�̃T�C�Y��ݒ�
	document.getElementById("flame1").style.width=w;
	document.getElementById("flame1").style.height=h;
}

//���ߍ��ݗpHTML(iframe)�𐶐�
function getEnbedHTML(){
	var enbedURL = "";
	var enbedHTML = "";

	//�A�j���[�V�����\���s�̏ꍇ�͋󕶎���Ԃ�
	if(!motionable) return "";

	//�g�T�C�Y�v�Z�̂��߂ɁA�g�嗦�𖄂ߍ��ݗp�̂��̂Ɖ��肵���ꍇ�̊e�l���v�Z
	var tmpSmallRangeX   = smallRangeXBasis * embedZoom;
	var tmpSmallRangeY   = smallRangeYBasis * embedZoom;
	var tmpBaseLine      = (baseLineBasis-upSpace) * embedZoom + upSpace;
	var tmpNowHandWidth  = nowHandWidthBasis * embedZoom;
	var tmpNowHandHeight = nowHandHeightBasis * embedZoom;

	//�_�~�[�C���[�W���W�̌v�Z���@�Ɠ���̕��@�ŉ����A�c�����v�Z
	var w = xRC*tmpSmallRangeX + xBase + leftSpace + tmpNowHandWidth;
	//�����������͂ݏo�������Ȃ̂ŋC�����L�߂ɂ���
	w += 10;
	var h = (-a_hold*s*s/8+handImageHeight)*tmpSmallRangeY + yBase + tmpBaseLine +tmpNowHandHeight;
	//�g�̏c�����s�v�ɑ傫���Ȃ�̂�h�����߂̔������B�l�ɂ͍����Ȃ�(�v����)
	h -= (40*tmpSmallRangeY);

	//����
	//�����́ASS�\����(w2)�ƁA�G�\����(w)�̂����傫�������̗p
	//w2����́u��́v�����N��(44px)����������
	var w2 = document.getElementById("flame1").offsetWidth - 44;
	w = max2(w,w2);
	//�c���́A�Œ჉�C���ƁA�G�\����(h)�̂����傫�������̗p
	if(SSdata["p"]==7){
		h = max2(h,188);
	}else{
		h = max2(h,140);
	}
	//�������߂ɕ����Ƃ�
	w+=5;
	h+=5;
	//�؎̂�
	w = Math.floor(w);
	h = Math.floor(h);

	//���ߍ��ݐ�URL���쐬
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

//���ߍ���URL�\���G���A��URL��\��
function dispEmbedURL(){
	document.animationForm.embedUrlArea.value = getEnbedHTML();
}

//���ߍ���URL�\���G���A���I�����ꂽ�ۂɁA���̕������S�I����Ԃɂ���
function embedSelect(){
	document.animationForm.embedUrlArea.focus();
	document.animationForm.embedUrlArea.select();
}

//�ꎞ��~��Ԃ��N�b�L�[����擾���ăZ�b�g
function setPauseFlag(){
	//�N�b�L�[�����Ԃ��擾
	var a = parseInt(CookieRead("pause"));
	if(a==1){
		pauseFlag = true;
	}else{
		pauseFlag = false;
	}
}