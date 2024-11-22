<?php
	require('../includes/includes.php');
	ob_start("sanitize_page");
	new Session(['ALL']);
	
	$seoArr['title'] = 'Create-A-Class Information - '.IW_Title;
	$seoArr['desc'] = 'The page for create a class information in call of duty infinite warfare';
	$seoArr['keywords'] = 'COD Infinite Warfare RCG, iw 3 random class generator, Infinite Warfare, warfare';
	$seoArr['url'] = '//'.SYS_URL_PATH.'/'.IW_Folder.'/info';

	$seoArr['breadcrumb'] = '<div itemscope itemtype="http://data-vocabulary.org/Breadcrumb" class="hide">
								<a href="'.$seoArr['url'].'" itemprop="url">
									<span itemprop="title">Class Info</span>
								</a>
							</div>';
?>
<?php require_once ('includes/pagesections/_top.php'); ?>
	<?php
		echo minify_builder ([
			'BASE' => '/'.IW_Folder.'/assets/scripts',
			'files' => [
				'pages/info/main.controller.js',
				'pages/info/main.service.js'
			]
		]);
	?>
	<div class="row" ng-controller='InfoCtrl as myCtrl'>
		<div class="col s12">
			<h1 class="text-center">Create-A-Class Info</h1>
			<?php require ('../includes/pagesections/ads/Ad_top.php'); ?>
			<div class="divider"></div>
			<div class="row">
				<div class="col s12">
					<ul class="tabs">
						<li class="tab"><a class="grey darken-2 yellow-text text-accent-2" href="#Guns">Guns</a></li>
						<li class="tab"><a class="grey darken-2 yellow-text text-accent-2" href="#Perks">Perks</a></li>
						<li class="tab"><a class="grey darken-2 yellow-text text-accent-2" href="#Killstreaks">Killstreaks</a></li>
						<li class="tab"><a class="grey darken-2 yellow-text text-accent-2" href="#Equipment">Equipment</a></li>
					</ul>
				</div>
				<br><br>
				<div ng-hide='myCtrl.InitialLoad'>
					<div id="Guns" class="col s12"><?php require ('includes/pagesections/info/guns.php'); ?></div>
					<div id="Perks" class="col s12"><?php require ('includes/pagesections/info/perks.php'); ?></div>
					<div id="Killstreaks" class="col s12"><?php require ('includes/pagesections/info/killstreaks.php'); ?></div>
					<div id="Equipment" class="col s12"><?php require ('includes/pagesections/info/equipment.php'); ?></div>
				</div>
				<div ng-show='myCtrl.InitialLoad' class="text-center"><i class="fa fa-refresh fa-spin fa-3x"></i></div>
			</div>
		</div>
	</div>
	<?php require ('../includes/pagesections/ads/Ad_bottom.php'); ?>
<?php require_once ('includes/pagesections/_bottom.php'); ?>