export default defineEventHandler(()=>{
    return {
        node: process.versions.node,
        system: process.platform,
        arch: process.arch,
        memory: process.memoryUsage(),
        uptime: process.uptime(),
        cpu: process.cpuUsage(),
    }
})