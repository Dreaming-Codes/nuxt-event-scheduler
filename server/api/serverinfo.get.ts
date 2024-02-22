import * as os from "os";

export default defineEventHandler(() => {
    let totalMemHuman, freeMemHuman, heapUsedHuman, heapTotalHuman;

    const memory = process.memoryUsage();

    // use MB if less than 1gb
    if (os.totalmem() < 1024 * 1024 * 1024) {
        totalMemHuman = os.totalmem() / 1024 / 1024 + " MB";
    } else {
        totalMemHuman = os.totalmem() / 1024 / 1024 / 1024 + " GB";
    }
    if (os.freemem() < 1024 * 1024 * 1024) {
        freeMemHuman = os.freemem() / 1024 / 1024 + " MB";
    } else {
        freeMemHuman = os.freemem() / 1024 / 1024 / 1024 + " GB";
    }
    if (memory.heapUsed < 1024 * 1024 * 1024) {
        heapUsedHuman = process.memoryUsage().heapUsed / 1024 / 1024 + " MB";
    } else {
        heapUsedHuman =
            process.memoryUsage().heapUsed / 1024 / 1024 / 1024 + " GB";
    }
    if (memory.heapTotal < 1024 * 1024 * 1024) {
        heapTotalHuman = process.memoryUsage().heapTotal / 1024 / 1024 + " MB";
    } else {
        heapTotalHuman =
            process.memoryUsage().heapTotal / 1024 / 1024 / 1024 + " GB";
    }

    return {
        node: process.versions.node,
        system: process.platform,
        arch: process.arch,
        memory: process.memoryUsage(),
        uptime: process.uptime(),
        cpu: process.cpuUsage(),
        platform: os.type,
        cores: os.cpus().length,
        model: os.cpus()[0].model,
        speed: os.cpus()[0].speed,
        totalMem: os.totalmem(),
        freeMem: os.freemem(),
        heapTotal: process.memoryUsage().heapTotal,
        heapUsed: process.memoryUsage().heapUsed,
        totalMemHuman,
        freeMemHuman,
        heapTotalHuman,
        heapUsedHuman
    };
});
