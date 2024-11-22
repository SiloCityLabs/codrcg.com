<?php
	require('../includes/includes.php');
	ob_start("sanitize_page");
	new Session(['ALL']);

	$seoArr['desc'] = 'A handy utility to generate random classes for Call of duty: Black Ops 3. This adds a new level of fun to the game by generating random classes for you to enjoy';
	$seoArr['keywords'] = 'Call of duty, call, of, duty, cod, call of duty, random, class, generator, random class generator, rcg, 
		free, mp, multiplayer, call of duty random class generator, COD Black Ops 3 RCG, COD Blops 3 RCG, blops 3 random class generator, 
		blops 3, black ops 3, ops 3 rcg, ops 3 random class generator, black ops 3 random class generator, zombies, treyarch zombies, 
		black ops zombies, black ops 3 zombies, black ops rcg, black ops random class generator';


	$TotalClasses = getconfig ('Cached_BO3_Class_Count');
?>
<?php require_once ('includes/pagesections/_top.php'); ?>
	<div class="row">
		<form name="myForm" class="col s12">
			<div class="row text-center">
				<div class="col s12 m9 l9">
					<h1>Black Ops 3 Random Class Generator</h1>
				</div>
			</div>
			<div class="row">
				<div class="col s12 m9 l9">
					<div id='top' class="text-center">
						<?php require ('../includes/pagesections/ads/Ad_top.php'); ?>
						<?php require('../includes/pagesections/dev_alert.php'); ?>
						<h2 class="smallH2">Designed to generate a random class for players to use in Black Ops 3.</h2>
						<span>Some Features of this class generator are:</span><br>
						<span>
							All Weapons, Attachments, Perks, Lethals, Tacticals, Killstreaks, &amp; Specialists are included.<br>
							Links to every class generated<br>
							Fully Customizable!<br>
						</span>
						<div>We have generated over <span id="classCount"><?php echo number_format($TotalClasses); ?></span> random classes for our users.</div>
					</div>
					<div class="text-center">
						<a class="waves-effect waves-light btn orange accent-4" href="/<?php echo BO3_Folder; ?>/class" ng-disabled='myForm.$invalid'>
							<i class="material-icons left">refresh</i>
							<span ng-show='myForm.$valid'>Roll Class</span>
							<span ng-show='myForm.$invalid'>Set Valid Player Level</span>
						</a>
					</div>
				</div>
				<div class="col s12 m3 l3 text-center">
					<?php require('../includes/pagesections/ads/Ad_bottom.php'); ?>
					<div class="divider margin-bottom-10 margin-top-10"></div>
					<?php require_once('../includes/pagesections/social/twitter_btn.php'); ?>
					<?php require_once('../includes/pagesections/social/facebook_btn.php'); ?>
				</div>
			</div>
		</form>
	</div>
<?php require_once ('includes/pagesections/_bottom.php'); ?>