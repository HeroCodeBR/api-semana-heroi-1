import AWS from 'aws-sdk';

AWS.config.credentials = new AWS.EnvironmentCredentials('AWS');

AWS.config.update({ region: process.env.AWS_REGION });

const s3 = new AWS.S3();

export { s3 };
