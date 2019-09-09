    /**
     * 游戏配置
     */
    var gameConfig = {
        width: 640,
        height: 390,
        rows: 3, //行数
        cols: 3, //列数
        isOver: false, //游戏是否结束
        imgurl: "images/1.jpg", //图片路径，注意：相对的是页面路径
        dom: document.getElementById("game") //游戏的dom对象
    };
    gameConfig.pieceWidth = gameConfig.width / gameConfig.cols;
    gameConfig.pieceHeight = gameConfig.height / gameConfig.rows;
    //小块的数量
    gameConfig.pieceNumber = gameConfig.rows * gameConfig.cols;

    var blocks = []; //包含小方块信息的数组

    function isEqual(n1, n2) {
        return parseInt(n1) === parseInt(n2);
    }

    /**
     * 
     * @param {*} left 
     * @param {*} top 
     * @param {*} isVisible  是否可见
     */ function Block(left, top, isVisible) {
        this.left = left;
        this.top = top;
        this.correctLeft = this.left; //正确的坐标
        this.correctTop = this.top; //正确的坐标
        this.isVisible = isVisible; //是否可见
        this.dom = document.createElement("div");
        this.dom.style.width = gameConfig.pieceWidth + "px";
        this.dom.style.height = gameConfig.pieceHeight + "px";
        this.dom.style.background = `url("${gameConfig.imgurl}") -${this.correctLeft}px -${this.correctTop}px`;
        this.dom.style.position = "absolute";
        this.dom.style.border = "1px solid #fff";
        this.dom.style.boxSizing = "border-box";
        this.dom.style.cursor = "pointer";

        if (!isVisible) {
            this.dom.style.display = "none";
        }
        gameConfig.dom.appendChild(this.dom);
    
        this.show = function () {
            //根据当前的left、top，重新设置div的位置
            this.dom.style.left = this.left + "px";
            this.dom.style.top = this.top + "px";
        }
        //判断当前方块是否在正确的位置上
        this.isCorrect = function () {
            return isEqual(this.left, this.correctLeft) && isEqual(this.top, this.correctTop);
        }
    
        this.show();
    }
    /**
     * 初始化游戏
     */
    function init() {
        initGameDom();
        initBlocksArray();
        shuffle();
        regEvent();
      
       

        function regEvent() {
            var inVisibleBlock = blocks.find(function (b) {
                return !b.isVisible;
            });
            blocks.forEach(function (b) {
                b.dom.onclick = function () {
                    if (gameConfig.isOver) {
                        returnl
                    }
                    //判断是否可以交换
                    if (b.top === inVisibleBlock.top &&
                        isEqual(Math.abs(b.left - inVisibleBlock.left), gameConfig.pieceWidth) ||
                        b.left === inVisibleBlock.left &&
                        isEqual(Math.abs(b.top - inVisibleBlock.top), gameConfig.pieceHeight)) {
                        exchange(b,inVisibleBlock);
                        isWin();
                    }
                }
            })
        }

        /**
         * 游戏结束判断
         * 
         */
        function isWin() {
            var wrongs = blocks.filter(function (item) {
                return !item.isCorrect();
            });
            if (wrongs.length === 0) {
                gameConfig.isOver = true;
                blocks.forEach(function (b) {
                    b.dom.style.border = "none";
                    b.dom.style.display = "block";
                });
            }
        }
        /**
         * 随机数
         * @param {*} min 
         * @param {*} max 
         */
        function getRandom(min, max) {
            return Math.floor(Math.random() * (max + 1 - min) + min);
        }

        function exchange(b1, b2) {
            var temp = b1.left;
            b1.left = b2.left;
            b2.left = temp;

            temp = b1.top;
            b1.top = b2.top;
            b2.top = temp;

            b1.show();
            b2.show();
        }

        /**
         * 洗牌
         */
        function shuffle() {
            for (var i = 0; i < blocks.length - 1; i++) {
                var index = getRandom(0, blocks.length - 2);
                exchange(blocks[i], blocks[index]);
            }
        }

        function initBlocksArray() {
            for (var i = 0; i < gameConfig.rows; i++) {
                for (var j = 0; j < gameConfig.cols; j++) {
                    var isVisible = true;
                    if (i === gameConfig.rows - 1 && j === gameConfig.cols - 1) {
                        isVisible = false;
                    }
                    var b = new Block(j * gameConfig.pieceWidth, i * gameConfig.pieceHeight, isVisible);
                    blocks.push(b);
                }
            }
        }

        function initGameDom() {
            gameConfig.dom.style.width = gameConfig.width + "px";
            gameConfig.dom.style.height = gameConfig.height + "px";
            gameConfig.dom.style.border = "2px solid #ccc";
            gameConfig.dom.style.position = "relative";
        }
    }
    init();