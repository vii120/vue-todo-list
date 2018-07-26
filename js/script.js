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
    allPlan: {content: 'All Done!', complete: false},
    selectList: ['all', 'active', 'completed', 'stared'],
    filter: 'all',
  },
  methods: {
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
    removePlan(plan) {
      if (confirm(`Do you want to delete "${plan.content}"?`)){
        this.list.splice(this.list.indexOf(plan),1)
      }
    },
    removeAll() {
      if (confirm("Do you want to delete ALL?")){
        this.list = [];
      }
    },
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
    complete(plan) {
      plan.complete = !plan.complete;
    },
    allcheck() {
      const vm = this;
      if (vm.allPlan.complete == false){
        vm.list.forEach(function(item){
          item.complete = true
        })
        vm.allPlan.content = 'All mark as unfinished!'
      } else {
        vm.list.forEach(function(item){
          item.complete = false
        })
        vm.allPlan.content = 'All done!'
      }
      vm.allPlan.complete = !vm.allPlan.complete;
    },
    starItem(plan) {
      const vm = this;
      plan.star = !plan.star
    },
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
    completeNum() {
      const vm = this;
      let active = vm.list.filter(function(item){
        return item.complete == true });
      return active.length
    },
    showAllCheck() {
      const vm = this;
      if (vm.filter=='all' && vm.list.length!==0) {
        return true
      } else {
        return false
      }
    }
  }
})