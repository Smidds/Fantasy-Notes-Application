<template>
  <div>
    <span>Logging out . . .</span>
  </div>
</template><script>
import { AUTH } from "@/boot/firebase";
export default {
  mounted() {
    AUTH.signOut().then(() => {
      this.$router.push("/login");
    });
  }
};
</script>