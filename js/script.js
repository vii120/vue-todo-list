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
    //add new plan
    addPlan(plan) {
      if (plan!=''){
        this.list.push({
          content: plan,
          complete: false,
          star: false
        });
        this.newPlan = '';
      }
    },
    // remove single plan
    removePlan(plan) {
      if (confirm(`Do you want to delete "${plan.content}"?`)){
        this.list.splice(this.list.indexOf(plan),1)
      }
    },
    //remove all plan
    removeAll() {
      if (confirm("Do you want to delete ALL?")){
        this.list = [];
      }
    },
    //remove completed plan
    removeComplete() {
      const vm = this;
      console.log(vm.completeNum);
      if (vm.completeNum!==0){
        if (confirm("Do you want to delete all completed item(s)?")){
          this.list.forEach(function(item){
            if (item.complete){
              this.list.splice(this.list.indexOf(item),1)
            }
          })
        }
      } else {
        alert('Nothing has been completed!');
      }
    },
    //complete/incomplete single plan
    complete(plan) {
      plan.complete = !plan.complete;
    },
    //complete/incomplete all plan
    allCheck() {
      const vm = this;
      vm.allComplete = !vm.allComplete;
      vm.list.forEach(function(item){
        item.complete = vm.allComplete
      })
    },
    //stared single plan
    starItem(plan) {
      const vm = this;
      plan.star = !plan.star
    },
    //edit single plan
    editItem(plan) {
      let edit = prompt('Please edit the content below：', plan.content);
      if (edit==null || edit==''){
        return 
      } else {
        plan.content = edit
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
    }
  }
})