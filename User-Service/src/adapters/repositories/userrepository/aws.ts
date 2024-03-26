import AWS from 'aws-sdk';

// Configure the AWS region
AWS.config.update({ region: 'us-east-1' }); // Specify your AWS region here

// Create an instance of the AWS SNS service
const sns = new AWS.SNS();

// Interface for device information
interface DeviceInfo {
    deviceToken: string;
    deviceType: string;
}

// Function to subscribe a user to an AWS SNS topic
async function subscribeToSNS(deviceInfo: DeviceInfo, vapidPublicKey: string, userId: string): Promise<string> {
    try {
       
        const params: AWS.SNS.SubscribeInput = {
            Protocol: 'https', 
            TopicArn: 'arn:aws:sns:us-east-1:211125388781:meta-media', 
            Endpoint: `http://${deviceInfo.deviceToken}`,
            Attributes: {
                'PublicKey': vapidPublicKey,
                'Platform': deviceInfo.deviceType,
                'userId': userId
            }
        };

       
        const subscriptionResult: AWS.SNS.SubscribeResponse = await sns.subscribe(params).promise();
        console.log('Subscription successful:', subscriptionResult.SubscriptionArn);

        return subscriptionResult.SubscriptionArn || '';
    } catch (error) {
        console.error('Error subscribing to AWS SNS:', error);
        throw error; 
    }
}

// Function to publish a message to an AWS SNS topic
async function publishToSNS(topicArn: string, message: string, userId: string, deviceType: string): Promise<void> {
    try {
        // Define the filter policy
        const filterPolicy: Record<string, string[]> = {
            "userId": [userId]
        };

        // Modify the filter policy based on the user's device type
        if (deviceType === 'Mac') {
            filterPolicy["deviceType"] = ['Mac'];
        } else if (deviceType === 'Windows') {
            filterPolicy["deviceType"] = ['Windows'];
        }

        // Create the MessageAttributeValue for the filter policy
        const filterPolicyAttributeValue: AWS.SNS.MessageAttributeValue = {
            DataType: 'String',
            StringValue: JSON.stringify(filterPolicy)
        };

        // Publish the message with the filter policy
        const params: AWS.SNS.PublishInput = {
            Message: message,
            TopicArn: topicArn,
            MessageAttributes: {
                "FilterPolicy": filterPolicyAttributeValue
            }
        };

        await sns.publish(params).promise();
        console.log('Message published successfully.');
    } catch (error) {
        console.error('Error publishing message to AWS SNS:', error);
        throw error;
    }
}

export { subscribeToSNS, publishToSNS };
