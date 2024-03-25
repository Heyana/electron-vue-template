import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "Home",
  setup: () => () => com(),
  mounted() {},
});

const com = () => <div>Home</div>;
