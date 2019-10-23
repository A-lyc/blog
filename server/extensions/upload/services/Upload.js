'use strict'

/**
 * Upload.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

const fs = require('fs')
const _ = require('lodash')
const sizeOf = require('image-size')

module.exports = {
  upload (files, config) {
    // Get upload provider settings to configure the provider to use.
    const provider = _.find(strapi.plugins.upload.config.providers, {
      provider: config.provider
    })
    
    if (!provider) {
      throw new Error(
        `The provider package isn't installed. Please run \`npm install strapi-provider-upload-${ config.provider }\``
      )
    }
    
    const actions = provider.init(config)
    
    // upload a single file
    const uploadFile = async file => {
      await actions.upload(file)
      
      // Remove buffer to don't save it.
      delete file.buffer
      file.provider = provider.provider
      
      const res = await strapi.plugins[ 'upload' ].services.upload.add(file)
      
      // 添加 width 和 height 字段
      if (res.mime.indexOf('image') !== -1) {
        let { id } = res
        let { width, height } = sizeOf(file.tmpPath)
        
        await strapi.query('file', 'upload').update(
          { id },
          { width, height }
        )
      }
      
      // Remove temp file
      if (file.tmpPath) {
        fs.unlinkSync(file.tmpPath)
      }
      
      return res
    }
    
    // Execute upload function of the provider for all files.
    return Promise.all(files.map(file => uploadFile(file)))
  }
}
