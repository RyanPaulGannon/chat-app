<template>
  <div class="container">
    <div class="left">
      <Chat />
    </div>
    <div class="right">
      <Preview />
    </div>
  </div>
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  height: 100vh;
  margin: 0;
  padding: 0;
}

.left {
  flex: 1;
  height: 100%;
}

.right {
  flex: 1;
  height: 100%;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    height: 100%;
  }

  .left {
    order: 2;
  }

  .left,
  .right {
    flex: none;
    width: 100%;
    height: 50%;
  }
}
</style>
