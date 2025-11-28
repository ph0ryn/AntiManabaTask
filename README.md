# AntiManaba

rewrite of [manabaNotifications](https://github.com/ruis2615/manabaNotifications) ([its article](https://zenn.dev/seiwell/articles/a39fab80cdb146))

GAS to add Manaba task to Google Calendar  
**YOU DON'T HAVE TO WORRY ABOUT MANABA EVERY DAY ANYMORE**

## requirements

- Bun

> [!NOTE]
> `./src` doesn't use Bun API  
> Bun is used as package manager and bundler

## Usage

1. run in shell
```shell
bun i
bun x clasp login
bun run push
```
2. add trigger in [GAS Web](https://script.google.com/home/all)

## ignore rule

.includes(keyword)

```jsonc
{
    "ignore": {
        "course": [], // コース名
        "task": [] // 課題名
    }
}
```

## future plan
- discord webhook
- line notification bot
