let circles = [];
let iframe;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight); // 全視窗畫布
  background('#bc6c25'); // 設定背景顏色
  canvas.elt.style.zIndex = '1'; // 將畫布放在最底層

  // 生成不規則分佈的圓形
  let cols = 10; // 水平分成 10 列
  let rows = 10; // 垂直分成 10 行
  let cellWidth = width / cols; // 每列的寬度
  let cellHeight = height / rows; // 每行的高度

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      // 在網格中心點的基礎上加入隨機偏移
      let x = i * cellWidth + cellWidth / 2 + random(-cellWidth / 4, cellWidth / 4);
      let y = j * cellHeight + cellHeight / 2 + random(-cellHeight / 4, cellHeight / 4);
      let size = random(30, 100); // 隨機大小
      let colorValue = color(random(255), random(255), random(255)); // 隨機顏色
      circles.push({ x, y, size, color: colorValue });
    }
  }

  // 建立選單
  createMenu();

  // 建立 iframe
  iframe = createElement('iframe');
  iframe.style('position', 'absolute');
  iframe.style('top', '10%');
  iframe.style('left', '10%');
  iframe.style('width', '80%');
  iframe.style('height', '80%');
  iframe.style('border', 'none');
  iframe.style('background', 'rgba(255, 255, 255, 0.2)'); // 背景透明度
  iframe.style('z-index', '2'); // 放在第二層
  iframe.hide(); // 預設隱藏
}

function draw() {
  background('#bc6c25'); // 每次重繪背景

  // 根據滑鼠位置調整圓的大小
  let sizeOffset = map(mouseX, 0, width, 10, 129);

  // 繪製所有圓
  for (let circle of circles) {
    fill(circle.color);
    noStroke();
    ellipse(circle.x, circle.y, circle.size + sizeOffset); // 圓大小隨滑鼠移動變化
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布
}

// 建立選單函式
function createMenu() {
  let menu = createElement('ul'); // 建立 ul 元素
  menu.style('list-style', 'none'); // 移除預設的項目符號
  menu.style('padding', '0');
  menu.style('margin', '0');
  menu.style('display', 'flex'); // 水平排列
  menu.style('position', 'absolute');
  menu.style('top', '10px');
  menu.style('right', '10px');
  menu.style('background', 'rgba(188, 108, 37, 0.5)'); // 背景顏色改為 #bc6c25 並降低透明度
  menu.style('border-radius', '5px');
  menu.style('overflow', 'hidden');
  menu.style('z-index', '3'); // 放在最上層

  // 選單項目
  let items = ['首頁', '自我介紹', '作品集', '測驗卷', '教學影片'];
  for (let item of items) {
    let li = createElement('li', item); // 建立 li 元素
    li.style('padding', '10px 15px');
    li.style('cursor', 'pointer');
    li.style('color', '#333');
    li.style('font-family', 'Arial, sans-serif');
    li.style('font-size', '30px'); // 放大字體大小
    li.style('border-right', '1px solid #ccc');
    li.style('background', 'rgba(255, 255, 255, 0.5)'); // 項目背景顏色透明度降低
    li.mouseOver(() => li.style('background', 'rgba(255, 255, 255, 0.7)')); // 滑鼠移入效果
    li.mouseOut(() => li.style('background', 'rgba(255, 255, 255, 0.5)')); // 滑鼠移出效果
    menu.child(li); // 將 li 加入 ul

    // 如果是 "作品集"，加入子選單
    if (item === '作品集') {
      let subMenu = createElement('ul');
      subMenu.style('list-style', 'none');
      subMenu.style('padding', '0');
      subMenu.style('margin', '0');
      subMenu.style('position', 'absolute');
      subMenu.style('top', '50px');
      subMenu.style('left', '0');
      subMenu.style('background', 'rgba(255, 255, 255, 0.8)');
      subMenu.style('border-radius', '5px');
      subMenu.style('display', 'none'); // 預設隱藏

      let subItems = [
        { name: '第一周', link: 'https://hackmd.io/@Eliza0915204828/r1MIIUBq1g' },
        { name: '第二周', link: 'https://hackmd.io/@Eliza0915204828/ry4sikdjJg' },
        { name: '第三周', link: 'https://hackmd.io/@Eliza0915204828/SyB-eH521g' },
        { name: '第四周', link: 'https://hackmd.io/@Eliza0915204828/11302coding_W4' }
      ];

      for (let subItem of subItems) {
        let subLi = createElement('li', subItem.name);
        subLi.style('padding', '10px 15px');
        subLi.style('cursor', 'pointer');
        subLi.style('color', '#333');
        subLi.style('font-family', 'Arial, sans-serif');
        subLi.style('font-size', '20px');
        subLi.style('background', 'rgba(255, 255, 255, 0.5)');
        subLi.mouseOver(() => subLi.style('background', 'rgba(255, 255, 255, 0.7)'));
        subLi.mouseOut(() => subLi.style('background', 'rgba(255, 255, 255, 0.5)'));
        subLi.mousePressed(() => {
          iframe.attribute('src', subItem.link); // 設定 iframe 的連結
          iframe.show(); // 顯示 iframe
        });
        subMenu.child(subLi);
      }

      li.mousePressed(() => {
        // 點擊 "作品集" 顯示或隱藏子選單
        if (subMenu.style('display') === 'none') {
          subMenu.style('display', 'block');
        } else {
          subMenu.style('display', 'none');
        }
      });
      li.child(subMenu);
    }
  }

  // 修正：移除最後一個項目的右邊框
  let children = menu.elt.children; // 使用 menu.elt.children 取得子元素
  if (children.length > 0) {
    children[children.length - 1].style.borderRight = 'none';
  }
}
