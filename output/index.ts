import * as pulumi from "@pulumi/pulumi";
import * as azure_native from "@pulumi/azure-native";

const config = new pulumi.Config();
// The name of the resource group to operate on
const resourceGroupName = config.require("resourceGroupName");
const currentResourceGroup = azure_native.resources.getResourceGroupOutput({
    resourceGroupName: resourceGroupName,
});
const storageAccountName = config.get("storageAccountName") || "teststorageacc";
const sa = new azure_native.storage.StorageAccount("sa", {
    accountName: storageAccountName,
    allowBlobPublicAccess: true,
    defaultToOAuthAuthentication: true,
    encryption: {
        keySource: "Microsoft.Storage",
        services: {
            blob: {
                enabled: true,
                keyType: "Account",
            },
            file: {
                enabled: true,
                keyType: "Account",
            },
        },
    },
    kind: "Storage",
    location: "eastus",
    minimumTlsVersion: "TLS1_2",
    networkRuleSet: {
        bypass: "AzureServices",
        defaultAction: azure_native.storage.DefaultAction.Allow,
        ipRules: [],
        virtualNetworkRules: [],
    },
    resourceGroupName: currentResourceGroup.apply(currentResourceGroup => currentResourceGroup.name),
    sku: {
        name: "Standard_LRS",
    },
});
