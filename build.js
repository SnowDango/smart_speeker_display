const builder = require('electron-builder');
const Platform = builder.Platform;

builder.build({
    targets: Platform.LINUX.createTarget(),
    config: {
        'appId': 'local.tobubreak.smartdisp',
        linux:{
            target:[
                {
                    target: "tar.gz",
                    arch:[
                        "ia32",
                    ]
                }
            ]
        },
    },
});