angular.module('app').controller('ServiceCityController', function($state,AdminService, $rootScope, $scope, $sce, RegionListFactory, LocalityListFactory, PlacesService, ServiceService, regions, serviceLocationParser) {

  $scope.regions = regions;
  $scope.regionList = new RegionListFactory();
  $scope.regionList.initialize(regions);

  $scope.localityList = new LocalityListFactory();

  $scope.loadRegionList = function(search) {
    return $scope.regionList.load($scope.service, search);
  };

  $scope.onSelectRegionList = function($item) {
    $scope.data.region = $item;
    $scope.regionList.select($item);

	var serviceType = $scope.findServiceDataByRegion();

    switch (serviceType.nID) {
      case 1:
        $state.go('index.service.general.city.link', {id: $scope.service.nID}, {location: false}).then(function() {
			isStep2 = true;
		});
		break;
      case 4:
        $state.go('index.service.general.city.built-in', {id: $scope.service.nID}, {location: false}).then(function() {
			isStep2 = true;
		});
		break;
      default:
	    $scope.localityList.load($scope.service, $item.nID, null).then(function(cities) {
          $scope.localityList.typeahead.defaultList = cities;
          var initialCity = serviceLocationParser.getSelectedCity(cities);
          if (initialCity)
            $scope.onSelectLocalityList(initialCity);
        });
    }
  };

  $scope.loadLocalityList = function(search) {
    return $scope.localityList.load($scope.service, $scope.data.region.nID, search);
  };

  $scope.onSelectLocalityList = function($item, $model, $label) {
    $scope.data.city = $item;
    $scope.localityList.select($item, $model, $label);
	var serviceType = $scope.findServiceDataByCity();
    switch (serviceType.nID) {
      case 1:
        $state.go('index.service.general.city.link', {id: $scope.service.nID}, {location: false}).then(function() {
			isStep2 = true;
		});
		break;
      case 4:
        $state.go('index.service.general.city.built-in', {id: $scope.service.nID}, {location: false}).then(function() {
			isStep2 = true;
		});
		break;
      default:
        $state.go('index.service.general.city.error', {id: $scope.service.nID}, {location: false}).then(function() {
			isStep2 = true;
		});
    }
  };

  $scope.data = {
    region: null,
    city: null
  };

  $scope.ngIfCity = function() {
	if($state.current.name === 'index.service.general.city.built-in') {
		if($scope.data.city) {
			return true;
		} else {
			return false;
		}
	}
	if($state.current.name === 'index.service.general.city.built-in.bankid') {
		if($scope.data.city) {
			return true;
		} else {
			return false;
		}
	}
	return $scope.data.region ? true: false;
  };

  $scope.getRegionId = function() {
	var region = $scope.data.region;
	return region ? region.nID: 0;
  };

  $scope.getCityId = function() {
	var city = $scope.data.city;
	return city ? city.nID: 0;
  };

  var isStep2 = false;
  $scope.ngIfStep2 = function() {
	return isStep2;
  };

  $scope.findServiceDataByRegion = function() {
	var aServiceData = $scope.service.aServiceData;
	var serviceType = {nID: 0};
    angular.forEach(aServiceData, function(value, key) {
      if (value.nID_Region && value.nID_Region.nID == $scope.data.region.nID) {
        serviceType = value.nID_ServiceType;
        $scope.serviceData = value;
		if($scope.serviceData.bNoteTrusted == false) {
			$scope.serviceData.sNote = $sce.trustAsHtml($scope.serviceData.sNote);
			$scope.serviceData.sNoteTrusted = true;
		}
      }
    });
	return serviceType;
  };

  $scope.findServiceDataByCity = function() {
	var aServiceData = $scope.service.aServiceData;
	var serviceType = {nID: 0};
    angular.forEach(aServiceData, function(value, key) {
      if (value.nID_City && value.nID_City.nID == $scope.data.city.nID) {
        serviceType = value.nID_ServiceType;
        $scope.serviceData = value;
		if($scope.serviceData.bNoteTrusted == false) {
			$scope.serviceData.sNote = $sce.trustAsHtml($scope.serviceData.sNote);
			$scope.serviceData.sNoteTrusted = true;
		}
      }
    });
	return serviceType;
  }

  $scope.step1 = function() {
    $scope.data = {
      region: null,
      city: null
    };

    $scope.regionList.reset();
    $scope.regionList.initialize(regions);

    $scope.localityList.reset();
    return $state.go('index.service.general.city', {id: $scope.service.nID}).then(function() {
		isStep2 = false;
	});
  };

  $scope.step2 = function() {
    var aServiceData = $scope.service.aServiceData;
    var serviceType = $scope.findServiceDataByCity();

    switch (serviceType.nID) {
      case 1:
        return $state.go('index.service.general.city.link', {id: $scope.service.nID}, {location: false});
      case 4:
        return $state.go('index.service.general.city.built-in', {id: $scope.service.nID}, {location: false});
      default:
        return $state.go('index.service.general.city.error', {id: $scope.service.nID}, {location: false});
    }
  };

  if ($state.current.name == 'service.general.city.built-in.bankid') {
    return true;
  }

  var initialRegion = serviceLocationParser.getSelectedRegion(regions);
  if (initialRegion)
    $scope.onSelectRegionList(initialRegion);
});

angular.module('app').controller('BuiltinCityController', function($scope) {
});
