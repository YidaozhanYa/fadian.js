#!/usr/bin/env node

const FadianTemplates = {
    // 此对象存储发癫模板
    fabing: name => `我好想做${name}小姐的狗啊。
可是${name}小姐说她喜欢的是猫，我哭了。
我知道既不是狗也不是猫的我为什么要哭的。因为我其实是一只老鼠。
我从没奢望${name}小姐能喜欢自己。我明白的，所有人都喜欢理解余裕上手天才打钱的萌萌的狗狗或者猫猫，没有人会喜欢阴湿带病的老鼠。
但我还是问了${name}小姐:“我能不能做你的狗?”
我知道我是注定做不了狗的。但如果她喜欢狗，我就可以一直在身边看着她了，哪怕她怀里抱着的永远都是狗。
可是她说喜欢的是猫。
她现在还在看着我，还在逗我开心，是因为猫还没有出现，只有我这老鼠每天蹑手蹑脚地从洞里爬出来，远远地和她对视。
等她喜欢的猫来了的时候，我就该重新滚回我的洞了吧。
但我还是好喜欢她，她能在我还在她身边的时候多看我几眼吗?
${name}小姐说接下来的每个圣诞夜都要和大家一起过。我不知道大家指哪些人。好希望这个集合能够对我做一次胞吞。
猫猫还在害怕${name}小姐。
我会去把她爱的猫猫引来的。
我知道稍有不慎，我就会葬身猫口。
那时候${name}小姐大概会把我的身体好好地装起来扔到门外吧。
那我就成了一包鼠条，嘻嘻。
我希望她能把我扔得近一点，因为我还是好喜欢她。会一直喜欢下去的。
我的灵魂透过窗户向里面看去，挂着的铃铛在轻轻鸣响，${name}小姐慵懒地靠在沙发上，表演得非常温顺的橘猫坐在她的肩膀。壁炉的火光照在她的脸庞，我冻僵的心脏在风里微微发烫。`,
    fadian: name => {
        const fadianSentences = [
            `${name}……🤤`,
            `嘿嘿………🤤`,
            `……好可爱……嘿嘿……${name}🤤`,
            `……${name}……我的🤤`,
            `……嘿嘿……🤤`,
            `………亲爱的……赶紧让我抱一抱……啊啊啊${name}软软的脸蛋🤤还有软软的小手手……🤤`,
            `…${name}……不会有人来伤害你的…🤤`,
            `你就让我保护你吧嘿嘿嘿嘿嘿嘿嘿嘿🤤`,
            `……太可爱了……🤤`,
            `……美丽可爱的${name}……像珍珠一样……🤤`,
            `嘿嘿……${name}……🤤`,
            `嘿嘿……🤤`,
            `……好想一口吞掉……🤤……但是舍不得啊……我的${name}🤤`,
            `……嘿嘿……🤤`,
            `我的宝贝……我最可爱的${name}……🤤`,
            `没有${name}……我就要死掉了呢……🤤`,
            `我的……🤤`,
            `嘿嘿……可爱的${name}……嘿嘿🤤`,
            `……可爱的${name}……嘿嘿🤤🤤`,
            `……可爱的${name}……🤤`,
            `……嘿嘿🤤`,
            `……可爱的${name}…（吸）身上的味道……好好闻～🤤`,
            `…嘿嘿🤤`,
            `……摸摸～……可爱的${name}……再贴近我一点嘛……（蹭蹭）嘿嘿🤤`,
            `……可爱的${name}……嘿嘿🤤`,
            `……～亲一口～……可爱的${name}……嘿嘿🤤`,
            `……抱抱你～可爱的${name}～（舔）喜欢～真的好喜欢～……（蹭蹭）🤤`,
            `脑袋要融化了呢～已经……除了${name}以外～什么都不会想了呢～🤤`,
            `嘿嘿🤤`,
            `……可爱的${name}……嘿嘿🤤`,
            `……可爱的${name}……我的～……嘿嘿🤤`
        ]
        return fadianSentences[Math.floor(Math.random() * fadianSentences.length)]
    }
}

const HELP_TEXT = `Usage: fadian.js [options]
Options:
  --help, -h             Show help message.
  Optional:
    --mode, -m <mode>      Output mode. {normal, interactive}
                           Default: normal
    --type, -t <type>      Fabing or fadian. {fabing, fadian}
                           Default: fabing
  Available only in normal mode:
    --name, -n <name>      Fadian object.
    --count, -c <count>    Fadian lines count.
`

const parseArgs = () => {
    // 解析参数
    const argv = process.argv
    let excepting = ''
    let settings = {
        type: null,
        name: null,
        count: null,
        mode: null,
        isHelp: false
    }
    // 去除无用项目
    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i]
        if (
            arg.startsWith('/') || arg.endsWith('.js')
        ) {
            argv.splice(i, 1)
            i--
        }
    }
    if (argv.length === 0) {
        settings.isHelp = true
        return settings
    }
    argv.forEach(arg => {
        if (excepting) {
            switch (excepting) {
                case 'type':
                    if (['fabing', 'fadian'].includes(arg)) {
                        settings.type = arg
                        break
                    } else {
                        throw new Error(`Unknown type:${arg}`)
                    }
                case 'name':
                    settings.name = arg
                    break
                case 'count':
                    if (Number.isInteger(Number(arg))) {
                        settings.count = Number(arg)
                        break
                    } else {
                        throw new Error(`Invalid count:${arg}`)
                    }
                case 'mode':
                    if (['normal', 'interactive'].includes(arg)) {
                        settings.mode = arg
                        break
                    } else {
                        throw new Error(`Unknown mode:${arg}`)
                    }
            }
            excepting = ''
        } else {
            switch (arg) {
                case '--help':
                case '-h':
                    settings.isHelp = true
                    break
                case '--type':
                case '-t':
                    excepting = 'type'
                    break
                case '--name':
                case '-n':
                    excepting = 'name'
                    break
                case '--count':
                case '-c':
                    excepting = 'count'
                    break
                case '--mode':
                case '-m':
                    excepting = 'mode'
                    break
                default:
                    throw new Error(`Unknown argument:${arg}`)
            }
        }
    })
    return settings
}

const main = () => {
    // CLI
    const settings = parseArgs()
    if (settings.isHelp) {
        console.log(HELP_TEXT)
        return
    }
    switch (settings.mode) {
        case null:
        case 'normal':
            console.log(fadian(settings))
            break
        case 'interactive':
            interactive(settings)
            break
    }
}

const fadian = settings => {
    if (!settings.name) {
        throw new Error('No name specified.')
    }
    const name = settings.name
    const count = settings.count || 1
    const type = settings.type || 'fabing'
    let i, output = ''
    for (i = 0; i < count; i++) {
        output += FadianTemplates[type](name)
    }
    return output.trim()
}

const interactive = settings => {
    const readline = require('readline')
    const interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    interface.question('Enter fadian object name: ', name => {
        console.log(fadian({ ...settings, name }))
        interface.close()
    })
}

main()

module.exports = fadian