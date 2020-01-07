<template>
  <nav class="HeaderNav">
    <ul class="HeaderNav__wrap">
      <li class="HeaderNav__display">
        <button class="original"><fa :icon="['fas', 'file-alt']" /></button>
        <button class="trans"><fa :icon="['fas', 'sync-alt']" /></button>
      </li>
      <li class="HeaderNav__language">
        <button><fa :icon="['fas', 'language']" /></button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "BaseHeaderNav"
};
</script>

<style scoped lang="scss">
.HeaderNav {
  display: block;
  margin-left: 20px;

  &__wrap {
    display: flex;
    align-items: center;
  }

  &__display {
    border: 1px solid var(--color-gray);
    border-radius: 2px;
    display: flex;

    button {
      width: 50px;
      height: 30px;
      color: var(--color-base);
      background-color: var(--color-gray);

      &.original {
      }

      &.trans {
        border-left: 1px solid var(--color-base);
      }

      &.application {
        color: var(--color-text);
        background-color: var(--color-base);
      }

      svg {
        width: auto;
        height: 14px;
      }
    }
  }

  &__language {
    margin-left: 20px;
    border: 1px solid var(--color-gray);
    border-radius: 2px;

    button {
      width: 50px;
      height: 30px;
      background-color: var(--color-gray);
      text-align: center;
    }

    svg {
      color: var(--color-base);
      width: 30px;
      height: auto;
    }
  }
}
</style>
