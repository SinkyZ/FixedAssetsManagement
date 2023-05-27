package licenta.adrian.FixedAssetsManagement.controllers;

import licenta.adrian.FixedAssetsManagement.dto.AssetDTO;
import licenta.adrian.FixedAssetsManagement.model.Asset;
import licenta.adrian.FixedAssetsManagement.model.Room;
import licenta.adrian.FixedAssetsManagement.services.AssetService;
import licenta.adrian.FixedAssetsManagement.services.CategoryService;
import licenta.adrian.FixedAssetsManagement.services.RoomService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("room/assets")
public class AssetController {
    private final AssetService assetService;
    private final RoomService roomService;

    public AssetController(AssetService assetService, RoomService roomService) {
        this.assetService = assetService;
        this.roomService = roomService;
    }

    @GetMapping
    public ResponseEntity<List<Asset>> getAllAssets(){
        List<Asset> allAssets = assetService.getAllAssets();
        return new ResponseEntity<>(allAssets, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Asset> getAssetById(@PathVariable("id") String id){
        Asset asset = assetService.getAssetById(id);
        return new ResponseEntity<>(asset, HttpStatus.OK );
    }
    @PostMapping
    public ResponseEntity<Asset> addAsset(@RequestBody AssetDTO assetDTO){
        Asset newAsset = new Asset();
        newAsset.setName(assetDTO.getName());
        newAsset.setDescription(assetDTO.getDescription());
        newAsset.setRoom(roomService.getRoomById(assetDTO.getRoomId()));
        //TODO; Dropdown with all categories to get the id.
        newAsset.setCategory(assetDTO.getCategory());
        assetService.addAsset(newAsset);
        return new ResponseEntity<>(newAsset, HttpStatus.CREATED);
    }
    @PutMapping("{id}")
    public ResponseEntity<Asset> updateAsset(@PathVariable("id") String id, @RequestBody Asset asset){
        Asset assetToUpdate = assetService.getAssetById(id);
        assetToUpdate.setName(asset.getName());
        assetToUpdate.setDescription(asset.getDescription());
        assetToUpdate.setCategory(asset.getCategory());
        assetService.updateAsset(assetToUpdate);
        return new ResponseEntity<>(assetToUpdate, HttpStatus.OK);
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<Asset> updateStatus(@PathVariable("id") String id, @RequestBody Asset asset){
        Asset assetToUpdate = assetService.getAssetById(id);
        if(asset.getIsWorking() != null)
        {
            assetToUpdate.setIsWorking(asset.getIsWorking());
        }

        assetToUpdate.setIsWorking(asset.getIsWorking());
        assetService.updateAsset(assetToUpdate);
        return new ResponseEntity<>(assetToUpdate, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteAsset(@PathVariable("id") String id){
        assetService.deleteAsset(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
