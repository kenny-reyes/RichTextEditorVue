export default {
    props: {
        value: {}
    },
    data () {
        return {
            localValue: this.value
        }
    },
    watch: {
        localValue (value) {
            this.$emit('update:value', value)
        },
        value (value) {
            this.localValue = value
        }
    }
}