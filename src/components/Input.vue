<template>
  <div class="inputComponent">
    <span class="label">{{ label }}</span>
    <textarea class="input" v-if="multiline" :rows="rows" :maxlength="max" :value="modelValue" @input="onInput"
      :placeholder="placeholder" />
    <input class="input" v-else :type="inputType" :maxlength="max" :disabled="disabled" :value="modelValue"
      @input="onInput" :placeholder="placeholder" />
    <div class="counter" v-if="max"> {{ modelValue.length }}/{{ max }} </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';

@Options({})
export default class Input extends Vue {
  @Prop({ default: '' })
  modelValue!: string;

  @Prop({ default: 'Podaj wartość' })
  label!: string;

  @Prop({ default: '' })
  placeholder!: string;

  @Prop({ default: 'text' }) inputType!: string;

  @Prop({ default: false }) multiline!: boolean;

  @Prop({ default: 4 }) rows!: number;

  @Prop() max?: number;

  @Prop({ default: false }) disabled!: boolean;

  onInput(event: any) {
    this.$emit('update:modelValue', event.target.value);
  }
}
</script>

<style lang="scss">
.inputComponent {
  position: relative;
  display: flex;
  flex-direction: column;

  .label {
    font-size: 13px;
    font-weight: bold;
    line-height: 16px;
    color: #818E9B;
    letter-spacing: 0.01em;
  }

  .input {
    box-sizing: border-box;
    padding: 8px 12px;
    font-size: 16px;
    line-height: 24px;
    background: #FFF;
    border: 1px solid #D9D9D9;
    border-radius: 4px;
  }

  .input::placeholder {
    color: #bfbfbf;
  }

  .counter {
    position: absolute;
    top: 28px;
    right: 8px;
    bottom: 8px;
    font-size: 14px;
    line-height: 16px;
    color: rgba(51, 51, 51, 0.35);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  &:focus-within .counter {
    opacity: 1;
  }
}
</style>
