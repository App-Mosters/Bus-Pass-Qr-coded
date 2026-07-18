const { withProjectBuildGradle } = require('@expo/config-plugins');

   module.exports = function withJscVersionFix(config) {
     return withProjectBuildGradle(config, (config) => {
       if (config.modResults.language === 'groovy') {
         const insertion = `
   allprojects {
     configurations.all {
       resolutionStrategy {
         force 'org.webkit:android-jsc:r174650'
       }
     }
   }
   `;
         if (!config.modResults.contents.includes('org.webkit:android-jsc:r174650')) {
           config.modResults.contents += insertion;
         }
       }
       return config;
     });
   };