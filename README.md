# To Do List

![home](https://i.imgur.com/LGTtqkw.png)

## Demo
https://vii120.github.io/vue-todo-list/

## Intro

以vue.js完成的待辦清單，上方會顯示已完成項目數量(mission completed)

### 功能

* 新增：輸入內容後按下enter，新增的項目會閃爍new字樣
* 刪除：可刪除單一項目、已完成項目或所有項目
* 編輯：點擊後會跳出簡易修改視窗，輸入空白內容時不會做任何修改
* 標記完成：標記完成後，該項目的編輯按鈕會消失，但仍可標記星號或刪除
* 標記星號：標記為重要項目
* 篩選功能：可篩選已完成項目、進行中項目或標記星號的項目

![selector](https://i.imgur.com/IvtT1NW.png)

### 暫存資料

以localStorage儲存所有清單內容，包含星號及是否完成等標記

重新整理後仍可看到編輯後的待辦清單

若要清除暫存資料，可點選最下方的"reset to default"

## CSS preprocessor

使用**SASS**撰寫

## Reference
六角學院：[Vue 出一個電商網站 ](https://www.udemy.com/vue-hexschool/)