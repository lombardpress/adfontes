<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  exclude-result-prefixes="xs"
  version="1.0" xmlns:tei="http://www.tei-c.org/ns/1.0">
  <xsl:output method="html"/>
  <xsl:template match="/">
    <xsl:apply-templates select="//tei:body"/>
  </xsl:template>
  <xsl:template match="tei:p">

      <xsl:apply-templates/>
    
  </xsl:template>
  <xsl:template match="tei:quote">
    "<xsl:apply-templates/>"
  </xsl:template>
  <xsl:template match="tei:rdg">

  </xsl:template>
  <xsl:template match="tei:note">

  </xsl:template>
  <xsl:template match="tei:bibl">

  </xsl:template>
  <xsl:template match="tei:reg">

  </xsl:template>
  <xsl:template match="tei:corr">

  </xsl:template>

</xsl:stylesheet>
