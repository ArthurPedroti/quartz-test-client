module.exports = {
  apps: [
    {
      name: 'quartz-test-client',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      cwd: './',
      instances: '-1',
      exec_mode: 'cluster'
    }
  ]
}
