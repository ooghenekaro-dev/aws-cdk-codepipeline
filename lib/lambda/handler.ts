export async function handler(event: any, context: any) {
  console.log('Lambda function executed on stage: ', process.env.STAGE);
  return {
    statusCode: 200,
    body: 'Lambda function executed successfully'
  };
}