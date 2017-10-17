import { SteamInventoryV1, SteamInventoryV2, SteamInventoryBaseAsset, SteamInventoryBaseDescription } from './inventory';


export function toSteamInventoryV1(inventoryV2: SteamInventoryV2): SteamInventoryV1 {
    return {
        success: Boolean(inventoryV2.success),
        rgInventory: inventoryV2.assets
            .reduce(
                (rgInventory, asset) => {
                    rgInventory[asset.assetid] = {
                        ...asset,
                        id: asset.assetid,
                    };
                    return rgInventory;
                },
                {}
            ),
        rgDescriptions: inventoryV2.descriptions
            .reduce(
                (rgDescriptions, description) => {
                    rgDescriptions[getSteamInventoryV1DescriptionId(description)] = {
                        ...description,
                        tags: description.tags
                            .map(tag => {
                                return {
                                    ...tag,
                                    name: tag.localized_tag_name,
                                    category_name: tag.localized_category_name,
                                };
                            }),
                        appid: String(description.appid),
                    };
                    return rgDescriptions;
                },
                {}
            ),
    };
}

export function getSteamInventoryV1DescriptionId(base: SteamInventoryBaseAsset | SteamInventoryBaseDescription): string {
    return `${base.classid}_${base.instanceid}`;
}