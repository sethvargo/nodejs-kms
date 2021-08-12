// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

async function main(
  projectId = 'my-project',
  locationId = 'us-east1',
  numBytes = 256
) {
  // [START kms_generate_random_bytes]
  //
  // TODO(developer): Uncomment these variables before running the sample.
  //
  // const projectId = 'my-project';
  // const locationId = 'us-east1';
  // const numBytes = 256;

  // Imports the Cloud KMS library
  const {KeyManagementServiceClient} = require('@google-cloud/kms');

  // Instantiates a client
  const client = new KeyManagementServiceClient();

  // Build the location name
  const locationName = client.locationPath(projectId, locationId);

  async function generateRandomBytes() {
    const [randomBytesResponse] = await client.generateRandomBytes({
      location: locationName,
      lengthBytes: numBytes,
      protectionLevel: 'HSM',
    });

    console.log(`Random bytes: ${randomBytesResponse.data.toString('base64')}`);
    return randomBytesResponse;
  }

  return generateRandomBytes();
  // [END kms_generate_random_bytes]
}
module.exports.main = main;

/* c8 ignore next 4 */
if (require.main === module) {
  const args = process.argv.slice(2);
  main(...args).catch(console.error);
}
