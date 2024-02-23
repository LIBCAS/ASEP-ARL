<?xml version="1.0" encoding="utf-8"?><xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<!-- Sablona pro informace o I3 aplikaci -->
	<xsl:output method="html" version="5.0" doctype-system="about:legacy-compact" omit-xml-declaration="yes" encoding="UTF-8" indent="yes"/>
	<xsl:template match="/">
		<html lang="en">
			<head>
				<meta http-equiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta charset="utf-8" />
				<meta name="robots" content="noindex,nofollow" />
				<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
				<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
				<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
				<xsl:for-each select="/node/head/meta">
					<xsl:if test="@name='update'">
						<xsl:variable name="update" select="@value"/>
						<meta http-equiv="last-modified" content="{$update}" />
					</xsl:if>
					<xsl:if test="@name='version'">
						<xsl:variable name="version" select="@value"/>
						<meta name="version" content="{$version}" />
					</xsl:if>
				</xsl:for-each>
				<title>
					<xsl:value-of select="//node/ul[@name='body']/li[@name='appdirname']"/>:
					<xsl:text>&#xA0;</xsl:text>
					<xsl:text>App info</xsl:text>
				</title>
				<style>/*
					<![CDATA[ */ /* ]]>*/</style>
			</head>
			<body itemscope="itemscope" itemtype="http://schema.org/WebApplication">
				<xsl:for-each select="/node/ul[@name='head']">
					<xsl:variable name="mainhref" select="normalize-space(./li[@name='url'])"/>
					<xsl:variable name="iconsrc" select="normalize-space(./li[@name='favicon'])"/>
					<div class="jumbotron">
						<div class="container">
							<h1>
								<img src="{$iconsrc}" alt="Favicon" width="16" />
						    		<a href="{$mainhref}" itemprop="name">
									<xsl:value-of select="./li[@name='title']"/>
								</a>
							</h1>
							<p>
								<xsl:value-of select="./li[@name='description']"/>
								<br />
								<small>
									<xsl:text>Version:</xsl:text>
									<code itemtype="version">
										<xsl:value-of select="./li[@name='version']"/>
									</code>
								</small>
							</p>
						</div>
					</div>
				</xsl:for-each>
				<div class="container">
					<xsl:if test="count(/node/ul[@name='errors']/li)">
						<div class="bg-danger" style="padding:4px;">
							<h2>Errors</h2>
							<ul>
								<xsl:for-each select="/node/ul[@name='errors']/li">
									<li>
										<xsl:value-of select="."/>
									</li>
								</xsl:for-each>
							</ul>
						</div>
					</xsl:if>
					<div>
						<h2>Configuration</h2>
						<table class="table">
							<thead>
								<tr>
									<th>Class</th>
									<th>T001</th>
									<th>Open in Web admin</th>
								</tr>
							</thead>
							<tbody>
								<xsl:for-each select="/node/ul[@name='config']/li">
									<xsl:variable name="adminlink">
										<xsl:if test="../../ul[@name='body']/li[@name='appdirname']='interpi'">
											<xsl:text>../</xsl:text>
										</xsl:if>
										<xsl:text>../webadmin/index.csp?class=</xsl:text>
										<xsl:value-of select="@class"/>
										<xsl:text>&amp;t001=</xsl:text>
										<xsl:value-of select="."/>
									</xsl:variable>
									<xsl:variable name="exists" select="@exists"/>
									<tr>
										<td>
											<xsl:value-of select="@class"/>
										</td>
										<td>
											<xsl:value-of select="."/>
										</td>
										<td>
											<a href="{normalize-space($adminlink)}" target="_blank" rel="external">
												<xsl:choose>
													<xsl:when test="$exists='true'">
														<span style="color:green" class="glyphicon glyphicon-ok" aria-hidden="true"></span>
														<xsl:text>&#xA0;</xsl:text>open</xsl:when>
													<xsl:otherwise>
														<span style="color:red" class="glyphicon glyphicon-flash" aria-hidden="true"></span>
														<xsl:text>&#xA0;</xsl:text>create</xsl:otherwise>
												</xsl:choose>
											</a>
										</td>
									</tr>
								</xsl:for-each>
							</tbody>
						</table>
					</div>
					<div>
						<h2>Language interface</h2>
						<table class="table">
							<tbody>
								<xsl:for-each select="/node/ul[@name='language']">
									<tr>
										<td>Default language</td>
										<td>
											<xsl:value-of select="li[@name='langdefault']"/>
											<xsl:text>&#xA0;</xsl:text>
											<xsl:text>(</xsl:text>
											<xsl:value-of select="li[@name='langdefaultname']"/>
											<xsl:text>)</xsl:text>
										</td>
									</tr>
									<tr>
										<td>Current language</td>
										<td>
											<xsl:value-of select="li[@name='lang']"/>
											<xsl:text>&#xA0;</xsl:text>
											<xsl:text>(</xsl:text>
											<xsl:value-of select="li[@name='langname']"/>
											<xsl:text>)</xsl:text>
										</td>
									</tr>
								</xsl:for-each>
								<xsl:if test="count(/node/ul[@name='ictx']/li)">
									<tr>
										<td>App links</td>
										<td>
											<xsl:for-each select="/node/ul[@name='ictx']/li">
												<xsl:variable name="title" select="@title"/>
												<xsl:variable name="href" select="normalize-space(@href)"/>
												<form class="form-inline">
													<div class="form-group" style="width:100%">
														<div class="input-group" style="width:100%">
															<a class="input-group-addon" style="width:100px" href="{$href}" title="Show this app as {$title}">
																<b>
																	<xsl:value-of select="."/>
																</b>
															</a>
															<input class="form-control" value="{$href}" />
														</div>
													</div>
												</form>
											</xsl:for-each>
										</td>
									</tr>
								</xsl:if>
								<xsl:if test="count(/node/ul[@name='ictx']/li)">
									<tr>
										<td>XML links</td>
										<td>
											<xsl:for-each select="/node/ul[@name='ictx']/li">
												<xsl:variable name="title" select="@title"/>
												<xsl:variable name="xmllink" select="normalize-space(@xmllink)"/>
												<a class="btn btn-default" href="{$xmllink}" title="Show this page as {$title}">
													<xsl:value-of select="."/>
												</a>
												<xsl:text>&#xA0;</xsl:text>
											</xsl:for-each>
										</td>
									</tr>
								</xsl:if>
							</tbody>
						</table>
					</div>
					<div>
						<h2>Other data</h2>
						<table class="table">
							<tbody>
								<xsl:for-each select="/node/ul[@name='body']/li">
									<xsl:variable name="name" select="@name"/>
									<xsl:variable name="type" select="@type"/>
									<xsl:variable name="href" select="normalize-space(.)"/>
									<tr>
										<td>
											<xsl:value-of select="@title"/>
										</td>
										<td>
											<xsl:choose>
												<xsl:when test="$type='url'">
													<td>
														<a href="{$href}" target="_blank" rel="external">
															<xsl:value-of select="."/>
														</a>
													</td>
												</xsl:when>
												<xsl:when test="$name='options'">
													<td>
														<xsl:call-template name="OptionsParams">
															<xsl:with-param name="string" select="."/>
														</xsl:call-template>
													</td>
												</xsl:when>
												<xsl:when test="$name='params'">
													<td>
														<xsl:call-template name="OptionsParams">
															<xsl:with-param name="string" select="."/>
														</xsl:call-template>
													</td>
												</xsl:when>
												<xsl:when test="$name='tilecolor'">
													<td>
														<p style="background-color:{$href};float:left;">
															<xsl:text>&#xA0; &#xA0; &#xA0; &#xA0; &#xA0;</xsl:text>
														</p>
														<xsl:text>&#xA0; &#xA0;</xsl:text>
														<xsl:value-of select="."/>
													</td>
												</xsl:when>
												<xsl:otherwise>
													<td>
														<xsl:value-of select="."/>
													</td>
												</xsl:otherwise>
											</xsl:choose>
										</td>
									</tr>
								</xsl:for-each>
							</tbody>
						</table>
					</div>
					<hr />
					<footer>
						<p class="text-center">
							<xsl:if test="//node/ul[@name='head']/li[@name='arlinfo']">
								<xsl:variable name="arlinfourl" select="normalize-space(//node/ul[@name='head']/li[@name='arlinfo'])"/>
								<a target="_blank" href="{$arlinfourl}">ARL info</a>
								<xsl:text>,&#xA0;</xsl:text>
							</xsl:if>
							<a href="../index.csp?type=xml">App index</a>
							<xsl:text>,&#xA0;</xsl:text>
							<b>App info</b>,
							<xsl:text>&#xA0;</xsl:text>
							<a target="_blank" rel="external" href="http://www.cosmotron.cz/">Cosmotron</a>
							<xsl:text>,&#xA0;2016</xsl:text>
						</p>
					</footer>
				</div>
			</body>
		</html>
	</xsl:template>
	<xsl:template name="OptionsParams">
		<xsl:param name="string"/>
		<xsl:choose>
			<xsl:when test="contains($string,' ')">
				<xsl:value-of select="substring-before($string,' ')"/>
				<br/>
				<xsl:call-template name="OptionsParams">
					<xsl:with-param name="string" select="substring-after($string,' ')"/>
				</xsl:call-template>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="$string"/>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet>