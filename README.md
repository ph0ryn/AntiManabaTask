# AntiManaba

rewrite of [manabaNotifications](https://github.com/ruis2615/manabaNotifications)

GAS to add Manaba task to Google Calendar  
**YOU DON'T HAVE TO WORRY ABOUT MANABA EVERY DAY ANYMORE**

## requirements

- Bun

> [!NOTE]
> `./src` doesn't use Bun API  
> Bun is used as package manager and bundler

## Usage

```shell
bun i
bun x clasp login
bun run push
```

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
