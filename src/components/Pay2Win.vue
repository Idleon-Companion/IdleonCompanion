<template>
  <div class="row">
    <div>
      <p class="h6 text-light bg-primary p-3 mt-3 mb-1 rounded">
        Track your alchemy progress of pay2win upgrades and see the costs/bonuses of those upgrades.
      </p>
    </div>
  </div>
  <p class="text-light"> THIS WILL BE THE P2W PAGE {{gold}} </p>
  <Pay2WinRow/>
</template>

<script lang="ts">
  import Pay2WinRow from "~/components/Pay2WinRow.vue";

  import { defineComponent } from "vue";
  import { Alch } from "~/composables/Alchemy";
  import { Util } from "~/composables/Utilities";

  export default defineComponent({
    name: "Pay2Win",
    components: {
      Pay2WinRow,
    },
    setup() {
      let gold = Util.goldToString(Alch.Pay2Win(50, 51, 0));

      return {   
        gold, 
      };
    },
  });
</script>
