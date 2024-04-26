import{_ as e,c as a,o as t,a7 as o}from"./chunks/framework.BFFpIdqr.js";const g=JSON.parse('{"title":"AreaInterpolation","description":"","frontmatter":{},"headers":[],"relativePath":"index.md","filePath":"index.md","lastUpdated":null}'),i={name:"index.md"},r=o('<h1 id="AreaInterpolation" tabindex="-1">AreaInterpolation <a class="header-anchor" href="#AreaInterpolation" aria-label="Permalink to &quot;AreaInterpolation {#AreaInterpolation}&quot;">​</a></h1><p>Documentation for <a href="https://github.com/JuliaGeo/AreaInterpolation.jl" target="_blank" rel="noreferrer">AreaInterpolation</a>.</p><ul><li><a href="#AreaInterpolation.AbstractInterpolationMethod"><code>AreaInterpolation.AbstractInterpolationMethod</code></a></li><li><a href="#AreaInterpolation.Dasymetric"><code>AreaInterpolation.Dasymetric</code></a></li><li><a href="#AreaInterpolation.Direct"><code>AreaInterpolation.Direct</code></a></li><li><a href="#AreaInterpolation.Pycnophylactic"><code>AreaInterpolation.Pycnophylactic</code></a></li><li><a href="#AreaInterpolation.decompose_to_geoms_and_values-Tuple{Any}"><code>AreaInterpolation.decompose_to_geoms_and_values</code></a></li></ul><div style="border-width:1px;border-style:solid;border-color:black;padding:1em;border-radius:25px;"><a id="AreaInterpolation.AbstractInterpolationMethod" href="#AreaInterpolation.AbstractInterpolationMethod">#</a> <b><u>AreaInterpolation.AbstractInterpolationMethod</u></b> — <i>Type</i>. <div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">abstract type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> AbstractInterpolationMethod</span></span></code></pre></div><p>The abstract type for all areal interpolation methods.</p><p><strong>Interface</strong></p><p>All <code>AbstractArealInterpolator</code>s must implement the following interface:</p><ul><li><code>interpolate(interpolator::AbstractInterpolationMethod, target::GI.AbstractPolygon, sources, values::Vector{Vector}, source_rtree)</code></li></ul><p>This interface is not set in stone and can be changed!</p><p>TODOS: - extensive vs intensive variables (currently we act as though variables are intensive) - weight methods (sum vs total) - just pass any arbitrary accumulator</p><p><a href="https://github.com/JuliaGeo/AreaInterpolation.jl/blob/0ad7996c969eb2e16b842b4c2c8000a2acd138d6/src/types.jl#L3-L16" target="_blank" rel="noreferrer">source</a></p></div><br><div style="border-width:1px;border-style:solid;border-color:black;padding:1em;border-radius:25px;"><a id="AreaInterpolation.Dasymetric" href="#AreaInterpolation.Dasymetric">#</a> <b><u>AreaInterpolation.Dasymetric</u></b> — <i>Type</i>. <div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Dasymetric</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(mask</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Raster</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>Dasymetric interpolation uses a mask to weight the influence of each polygon.</p><p>Depending on the choice of mask, like land-use data, this can prove to be a more accurate interpolation than the direct or pycnophylactic methods.</p><p><a href="https://github.com/JuliaGeo/AreaInterpolation.jl/blob/0ad7996c969eb2e16b842b4c2c8000a2acd138d6/src/types.jl#L100-L107" target="_blank" rel="noreferrer">source</a></p></div><br><div style="border-width:1px;border-style:solid;border-color:black;padding:1em;border-radius:25px;"><a id="AreaInterpolation.Direct" href="#AreaInterpolation.Direct">#</a> <b><u>AreaInterpolation.Direct</u></b> — <i>Type</i>. <div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Direct</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span></code></pre></div><p>A simple direct method for areal interpolation.</p><p>Takes the area-weighted mean of all source polygons&#39; features, weighted by their areas of intersection with the target polygon.</p><p>This method does not allocate a Raster, but it does perform polygon intersection tests.</p><p><a href="https://github.com/JuliaGeo/AreaInterpolation.jl/blob/0ad7996c969eb2e16b842b4c2c8000a2acd138d6/src/types.jl#L68-L77" target="_blank" rel="noreferrer">source</a></p></div><br><div style="border-width:1px;border-style:solid;border-color:black;padding:1em;border-radius:25px;"><a id="AreaInterpolation.Pycnophylactic" href="#AreaInterpolation.Pycnophylactic">#</a> <b><u>AreaInterpolation.Pycnophylactic</u></b> — <i>Type</i>. <div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Pycnophylactic</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span></code></pre></div><p>A pycnophylactic method for areal interpolation.</p><p>Pycnophylactic interpolation (Tobler, 1979) interpolates the source zone attribute to the target zones in a way that avoids sharp discontinuities between neighbouring target zones. It assumes that no sharp boundaries exist in the distribution of the allocated data, which may not be the case, for example, when target zones are divided by linear features (rivers, railways, roads) or are adjacent to waterbodies.</p><p>However, it generates intuitively elegant allocations for many urban case studies with many applications (Kounadi, Ristea, Leitner, &amp; Langford, 2018; Comber, Proctor, &amp; Anthony, 2008).</p><p>This description was taken in part from <a href="https://gistbok.ucgis.org/bok-topics/areal-interpolation" target="_blank" rel="noreferrer">the GIS&amp;T Body of Knowledge</a>.</p><p><a href="https://github.com/JuliaGeo/AreaInterpolation.jl/blob/0ad7996c969eb2e16b842b4c2c8000a2acd138d6/src/types.jl#L80-L95" target="_blank" rel="noreferrer">source</a></p></div><br><div style="border-width:1px;border-style:solid;border-color:black;padding:1em;border-radius:25px;"><a id="AreaInterpolation.decompose_to_geoms_and_values-Tuple{Any}" href="#AreaInterpolation.decompose_to_geoms_and_values-Tuple{Any}">#</a> <b><u>AreaInterpolation.decompose_to_geoms_and_values</u></b> — <i>Method</i>. <div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">decompose_to_geoms_and_values</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(sources; features </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> nothing</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>Decompose a table or feature collection into geometries and values. Returns <code>(geometries::Vector{Geometry}, values::NamedTuple{Vector})</code>.</p><p><code>values</code> is a namedtuple of each value column in <code>sources</code>. A value column is something whose eltype satisfies <code>isvaluecol</code>, and is currently <code>Union{Number, Missing}</code>.</p><p><a href="https://github.com/JuliaGeo/AreaInterpolation.jl/blob/0ad7996c969eb2e16b842b4c2c8000a2acd138d6/src/utils.jl#L5-L13" target="_blank" rel="noreferrer">source</a></p></div><br>',13),s=[r];function n(l,p,c,d,h,u){return t(),a("div",null,s)}const y=e(i,[["render",n]]);export{g as __pageData,y as default};