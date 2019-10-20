/* 让typescript可以识别vue组件 */
declare module "*.vue" {
    import Vue from 'vue'
    export default Vue
}