var app = new Vue({
  el: '#app',
  data: {
    list: [
      {content: 'buy eggs',
       complete: false,
       star: false,
      },
      {content: 'enroll cooking class',
       complete: false,
       star: false,
      },
      {content: 'visit Obama',
       complete: false,
       star: false,
      },
    ],
    newPlan: '',
    allComplete: false,
    selectList: ['all', 'active', 'completed', 'stared'],
    filter: 'all',
  },
  methods: {
    //get localStorage data
    getPlan() {
      if (localStorage.todoList!==undefined){
        this.list = JSON.parse(localStorage.todoList);
        delete this.list[this.list.length-1].new;
        this.allComplete = JSON.parse(localStorage.allComplete);
      } 
    },
    //save to localStorage
    savePlan() {
      localStorage.setItem('todoList',JSON.stringify(this.list));
      localStorage.setItem('allComplete',this.allComplete);
    },
    //add new plan
    addPlan() {
      const vm = this;
      if (vm.newPlan!==''){
        delete vm.list[vm.list.length-1].new;
        vm.list.push({
          content: vm.newPlan, complete: false, star: false, new:true
        });
        vm.newPlan = '';
      }
      vm.savePlan();
    },
    //remove btn
    removeBtn(item) {
      const vm = this;
      if (item=='all'){
        if (confirm("Do you want to delete ALL?")){
          vm.list = [];
        }
      } else if (item=='complete') {
        if (vm.completeNum!==0){
          if (confirm("Do you want to delete all completed item(s)?")){
            vm.list.forEach(function(item){
              if (item.complete){
                vm.list.splice(vm.list.indexOf(item),1)
              }
            })
          }
        } else {
          alert('Nothing has been completed!');
        }
      }
      vm.savePlan();
    },
    //list functions btn
    listFunction(plan, func) {
      const vm = this;
      switch (func) {
        case 'complete':
          if (plan=='all'){
            vm.allComplete = !vm.allComplete;
            vm.list.forEach(function(item){
              item.complete = vm.allComplete
            })
          } else {
            plan.complete = !plan.complete
          }
          break;
        case 'edit':
          let edit = prompt('Please edit the content below：', plan.content);
          if (edit!==null && edit!==''){
            plan.content = edit
          }
          break;
        case 'star':
          plan.star = !plan.star;
          break;
        case 'delete':
          if (confirm(`Do you want to delete "${plan.content}"?`)){
            this.list.splice(this.list.indexOf(plan),1)
          }
          break;
      }
      vm.savePlan();
    },
    // reset to default list
    resetList() {
      const vm = this;
      if (confirm('Your to-do list record will be delete.\nAre you sure?')){
        localStorage.clear();
        window.location.reload();
      }
    }
  },
  computed: {
    //filt list
    filtList() {
      const vm = this;
      switch (vm.filter){
        case 'active':
          return vm.list.filter(function(item){
            return item.complete == false
          });
          break;
        case 'completed':
          return vm.list.filter(function(item){
            return item.complete == true
          });
          break;
        case 'stared':
          return vm.list.filter(function(item){
            return item.star == true
          });
          break;
        case 'all':
          return vm.list;
      }
    },
    //completed plan counter
    completeNum() {
      const vm = this;
      let active = vm.list.filter(function(item){
        return item.complete == true });
      return active.length
    },
    //judgment: show "all check" option or not
    showAllCheck() {
      const vm = this;
      if (vm.filter=='all' && vm.list.length!==0) {
        return true
      } else {
        return false
      }
    },
    //all check option content
    allCheckText() {
      const vm = this;
      if (vm.allComplete){
        return 'All done!'
      } else {
        return 'All mark as unfinished!'
      }
    },
  },
  mounted(){
    // console.log(window.localStorage);
    this.getPlan();
  }
})
