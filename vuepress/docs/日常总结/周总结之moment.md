# 周总结之moment

dropSelector组件问题，搜索竟然是调接口，惊呆了，调接口也没loading

state中仅设置和视图相关的变量， 不能设置和视图无关变量，否则会由于setState的异步更新而导致各种问题

