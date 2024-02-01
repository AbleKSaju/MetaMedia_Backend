import { S3Client,PutBucketPolicyCommand} from "@aws-sdk/client-s3";
import dotenv from 'dotenv'
dotenv.config()
export const bucketName = process.env.BUCKET_NAME as string
export const bucketRegione = process.env.BUCKET_REGIONE as string
export const bucketAccessKey = process.env.BUCKET_ACCESS_KEY as string
export const bucketSecretAccessKey = process.env.BUCET_SECRETACCESKEY as string
export const s3  = new S3Client({
    credentials:{
        accessKeyId:bucketAccessKey,
        secretAccessKey:bucketSecretAccessKey
    },
    region:bucketRegione
})

const bucketPolicy = {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicRead",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject",
                "s3:GetObjectVersion"
            ],
            "Resource": "arn:aws:s3:::met.amedia/*"
        }
    ]
}

// Convert the bucket policy to a JSON string
const bucketPolicyString = JSON.stringify(bucketPolicy);

// Set the bucket policy
const putBucketPolicyCommand = new PutBucketPolicyCommand({
    Bucket: bucketName,
    Policy: bucketPolicyString,
});

// Execute the command
s3.send(putBucketPolicyCommand)
    .then(() => console.log('Bucket policy successfully set.'))
    .catch((error) => console.error('Error setting bucket policy:', error));