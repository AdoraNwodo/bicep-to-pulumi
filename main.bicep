targetScope = 'subscription'

param location string = 'East US'
param resourceGroupName string = 'yourresourcegroupname'

resource rg 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: resourceGroupName
  location: location
}
